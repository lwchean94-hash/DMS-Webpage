const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const DB_PATH = path.join(DATA_DIR, 'production_control_limits.sqlite');
const HTML_PATH = path.join(ROOT, 'qa_details', 'hartalega_product_control_limit_db.html');
const PORT = Number(process.env.PORT || 8080);

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS versions (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL,
    docno TEXT DEFAULT '',
    effective_date TEXT NOT NULL,
    revision_no INTEGER NOT NULL,
    version_type TEXT NOT NULL,
    end_date TEXT DEFAULT '',
    plants_json TEXT NOT NULL,
    lines_json TEXT NOT NULL,
    remarks TEXT DEFAULT '',
    editor TEXT DEFAULT '',
    params_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  );
`);

function nowIso() {
  return new Date().toISOString();
}

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 10_000_000) {
        req.destroy();
        reject(new Error('Request body is too large.'));
      }
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON body.'));
      }
    });
    req.on('error', reject);
  });
}

function normalizeProduct(row) {
  return {
    id: row.id,
    name: row.name,
    desc: row.description || '',
    description: row.description || '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function normalizeVersion(row) {
  return {
    id: row.id,
    docno: row.docno || '',
    date: row.effective_date,
    effectiveDate: row.effective_date,
    revno: row.revision_no,
    revisionNo: row.revision_no,
    versionType: row.version_type,
    endDate: row.end_date || '',
    plants: JSON.parse(row.plants_json || '[]'),
    lines: JSON.parse(row.lines_json || '[]'),
    remarks: row.remarks || '',
    editor: row.editor || '',
    params: JSON.parse(row.params_json || '[]'),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function getAllProducts() {
  return db.prepare('SELECT * FROM products ORDER BY name COLLATE NOCASE').all().map(normalizeProduct);
}

function getVersions(productId) {
  return db.prepare('SELECT * FROM versions WHERE product_id = ? ORDER BY created_at DESC')
    .all(productId)
    .map(normalizeVersion);
}

function getFullDatabase() {
  const products = getAllProducts();
  const versions = {};
  for (const product of products) {
    versions[product.id] = getVersions(product.id);
  }
  return { products, versions };
}

function upsertProduct(payload) {
  const time = nowIso();
  const id = String(payload.id || `prod_${Date.now()}`);
  const name = String(payload.name || '').trim();
  const description = String(payload.desc ?? payload.description ?? '').trim();
  if (!name) throw new Error('Product name is required.');

  const existing = db.prepare('SELECT id FROM products WHERE id = ?').get(id);
  if (existing) {
    db.prepare('UPDATE products SET name = ?, description = ?, updated_at = ? WHERE id = ?')
      .run(name, description, time, id);
  } else {
    db.prepare('INSERT INTO products (id, name, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?)')
      .run(id, name, description, time, time);
  }
  return normalizeProduct(db.prepare('SELECT * FROM products WHERE id = ?').get(id));
}

function addVersion(productId, payload) {
  const product = db.prepare('SELECT id FROM products WHERE id = ?').get(productId);
  if (!product) throw new Error('Product does not exist.');

  const versionType = String(payload.versionType || 'PERMANENT').trim();
  const date = String(payload.date || payload.effectiveDate || '').trim();
  const revno = Number(payload.revno ?? payload.revisionNo);
  const endDate = String(payload.endDate || '').trim();
  if (!date) throw new Error('Effective Date is required.');
  if (!Number.isFinite(revno)) throw new Error('Revision No. is required.');
  if (versionType === 'DEVIATION REQUEST (DR)' && !endDate) {
    throw new Error('End Date is required for DEVIATION REQUEST (DR).');
  }

  const time = nowIso();
  const id = String(payload.id || `v_${Date.now()}`);
  db.prepare(`
    INSERT INTO versions (
      id, product_id, docno, effective_date, revision_no, version_type, end_date,
      plants_json, lines_json, remarks, editor, params_json, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    productId,
    String(payload.docno || '').trim(),
    date,
    revno,
    versionType,
    endDate,
    JSON.stringify(payload.plants || []),
    JSON.stringify(payload.lines || []),
    String(payload.remarks || '').trim(),
    String(payload.editor || 'Current User'),
    JSON.stringify(payload.params || []),
    time,
    time
  );
  return normalizeVersion(db.prepare('SELECT * FROM versions WHERE id = ?').get(id));
}

function deleteVersion(productId, versionId) {
  const info = db.prepare('DELETE FROM versions WHERE product_id = ? AND id = ?').run(productId, versionId);
  return info.changes > 0;
}

function saveTooltips(tooltips) {
  if (!tooltips || typeof tooltips !== 'object' || Array.isArray(tooltips)) {
    throw new Error('Tooltip payload must be an object.');
  }
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const start = '// TOOLTIP_CONFIG_START';
  const end = '// TOOLTIP_CONFIG_END';
  const startIndex = html.indexOf(start);
  const endIndex = html.indexOf(end);
  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    throw new Error('Tooltip config block was not found in the HTML file.');
  }
  const replacement = `${start}\nconst TOOLTIP_TEXTS = ${JSON.stringify(tooltips, null, 2)};\n${end}`;
  const nextHtml = html.slice(0, startIndex) + replacement + html.slice(endIndex + end.length);
  fs.writeFileSync(HTML_PATH, nextHtml, 'utf8');
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.txt': 'text/plain; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.sqlite': 'application/octet-stream',
  }[ext] || 'application/octet-stream';
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const decoded = decodeURIComponent(url.pathname);
  const relative = decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '');
  const fullPath = path.normalize(path.join(ROOT, relative));
  if (!fullPath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType(fullPath) });
    res.end(data);
  });
}

async function handleApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const parts = url.pathname.split('/').filter(Boolean);

  try {
    if (req.method === 'GET' && url.pathname === '/api/health') {
      json(res, 200, { ok: true, mode: 'sqlite', dbPath: DB_PATH });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/products') {
      json(res, 200, getFullDatabase());
      return;
    }

    if (req.method === 'POST' && url.pathname === '/api/products') {
      const payload = await readBody(req);
      const product = upsertProduct(payload);
      json(res, 200, { product, db: getFullDatabase() });
      return;
    }

    if (parts[0] === 'api' && parts[1] === 'products' && parts[2]) {
      const productId = parts[2];
      if (req.method === 'GET' && parts.length === 4 && parts[3] === 'versions') {
        json(res, 200, { versions: getVersions(productId) });
        return;
      }
      if (req.method === 'POST' && parts.length === 4 && parts[3] === 'versions') {
        const payload = await readBody(req);
        const version = addVersion(productId, payload);
        json(res, 200, { version, db: getFullDatabase() });
        return;
      }
      if (req.method === 'DELETE' && parts.length === 5 && parts[3] === 'versions') {
        json(res, 200, { deleted: deleteVersion(productId, parts[4]), db: getFullDatabase() });
        return;
      }
    }

    if (req.method === 'POST' && url.pathname === '/api/tooltips') {
      const payload = await readBody(req);
      saveTooltips(payload.tooltips);
      json(res, 200, { ok: true });
      return;
    }

    json(res, 404, { error: 'Unknown API endpoint.' });
  } catch (err) {
    json(res, 400, { error: err.message || 'Request failed.' });
  }
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/')) {
    handleApi(req, res);
    return;
  }
  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Hartalega Foresight local server running at http://localhost:${PORT}/`);
  console.log(`Production Control Limit Database: http://localhost:${PORT}/qa_details/hartalega_product_control_limit_db.html`);
  console.log(`SQLite file: ${DB_PATH}`);
});
