const URLS = {
  compoundingLanding: '../hartalega_compounding_landing.html',
  compoundingBulk: '../compounding_details/hartalega_compounding_plant_bulk.html',
  compoundingMixing: '../compounding_details/hartalega_compounding_plant_mixing.html',
  compoundingCoag: '../compounding_details/hartalega_compounding_plant_coagulant.html',
  compoundingCaa: '../compounding_details/hartalega_compounding_plant_caa.html',
  compoundingStorage: '../compounding_details/hartalega_compounding_plant_storage.html',
  compoundingCoating: '../hartalega_compounding_landing.html',
  compoundingPolymer: '../hartalega_compounding_landing.html',
  productionLanding: '../hartalega_production_landing.html',
  productionPlantMain: '../production_details/hartalega_production_plant_main.html#P1',
  productionLine: '../production_details/hartalega_production_line_details.html#P1L1',
  productionCtq: 'https://dms.hartalega.com.my/foresight/d/dfm14qhptgrggb/ctq-overview-enhanced?orgId=1&from=now-6h&to=now&timezone=browser&var-plantNo=1',
  engPlantProcess: '../eng_plant_process/hartalega_eng_plant_process_landing.html',
  aiVision: 'http://ngc-appuat01-v:3000/d/pr472vq/hartalega-ai-vision-dashboard?orgId=1&from=now-6h&to=now&timezone=browser&var-plant=P9&var-line=L104&refresh=5s',
  engUtility: '../hartalega_eng_uty_landing.html',
  qaLanding: '../hartalega_qa_landing.html',
  qaOoc: 'https://dms.hartalega.com.my/foresight/d/efmeljipiu96od/ooc-dashboard?orgId=4&from=now-6h&to=now&timezone=browser',
  productControl: '../qa_details/hartalega_product_control_limit_db.html',
  compoundingControl: '../qa_details/hartalega_compounding_control_limit_db.html',
  oeLanding: '../hartalega_oe_landing.html',
  oeKpi: '../oe_details/hartalega_oe_kpi_db.html',
  dmsHealth: '../hartalega_dms_health.html'
};

const treeData = {
  name: "HARTALEGA FORESIGHT", 
  status: "root",
  url: "../index.html",
  children: [
    {
      name: "COMPOUNDING", 
      status: "category",
      url: URLS.compoundingLanding,
      children: [
        {
          name: "Dashboards Module", status: "live", url: URLS.compoundingLanding,
          children: [
            {
              name: "By Plant", status: "live", url: URLS.compoundingLanding,
              children: [
                { name: "Main Dashboard", status: "live", url: URLS.compoundingLanding },
                { name: "Bulk Tank", status: "live", url: URLS.compoundingBulk },
                { name: "Mixing Tank", status: "live", url: URLS.compoundingMixing },
                { name: "Coag Tank", status: "live", url: URLS.compoundingCoag },
                { name: "CAA", status: "live", url: URLS.compoundingCaa },
                { name: "Storage Tank", status: "live", url: URLS.compoundingStorage },
                { name: "Coating Tank", status: "live", url: URLS.compoundingCoating },
                { name: "Polymer Tank", status: "live", url: URLS.compoundingPolymer }
              ]
            }
          ]
        },
        { name: "CPD OOC Dashboard", status: "planned", note: "Follow similar format as production OOC" },
        { name: "Reports & Checklists", status: "planned", note: "Select Type of Reports - By Plant/ By Line" },
        { name: "Activity Logs", status: "planned", note: "Select Type of Activity Logs - By Plant/ By Line" }
      ]
    },
    {
      name: "PRODUCTION", 
      status: "category",
      url: URLS.productionLanding,
      children: [
        {
          name: "Production Dashboards", status: "demo", url: URLS.productionLanding,
          children: [
            {
              name: "By Plant", status: "demo", url: URLS.productionLanding,
              children: [
                {
                  name: "Main Dashboard (6 screen)", status: "live", url: URLS.productionPlantMain,
                  children: [
                    { name: "Production Health", status: "live", url: URLS.productionPlantMain },
                    { name: "Alarm Dashboard", status: "live", url: URLS.productionPlantMain },
                    { name: "Production Support", status: "live", url: URLS.productionPlantMain },
                    { name: "Glove Handling", status: "live", url: URLS.productionPlantMain },
                    { name: "Process Insights", status: "live", url: URLS.productionPlantMain },
                    { name: "OEE", status: "live", url: URLS.productionPlantMain }
                  ]
                }
              ]
            },
            {
              name: "By Lines", status: "demo", url: URLS.productionLine, note: "Analysis Dashboard",
              children: [
                { name: "Cleaning Area", status: "demo", url: URLS.productionLine },
                { name: "Coagulant & Latex", status: "demo", url: URLS.productionLine },
                { name: "Burner & Ovens", status: "demo", url: URLS.productionLine },
                { name: "Leaching & Beading", status: "demo", url: URLS.productionLine },
                { name: "Post-Curing", status: "demo", url: URLS.productionLine },
                { name: "Post-Process", status: "demo", url: URLS.productionLine, note: "GSR, ASM, Vision Rejection" }
              ]
            }
          ]
        },
        { name: "Reports & Checklists", status: "planned", note: "Select Type of Reports - By Plant/ By Line" },
        { name: "Activity Logs", status: "planned", note: "Select Type of Activity Logs - By Plant/ By Line" },
        { name: "Changeover Log", status: "planned" },
        { name: "CTQ", status: "live", url: URLS.productionCtq }
      ]
    },
    {
      name: "ENGINEERING P&P", 
      status: "category",
      url: URLS.engPlantProcess,
      children: [
        {
          name: "Maintenance Dashboards", status: "planned", url: URLS.engPlantProcess,
          children: [
            { name: "By Plant", status: "planned" },
            {
              name: "By Lines", status: "planned",
              children: [
                { name: "Chain Speed & Amps", status: "planned" },
                { name: "GSR/ASM/Puller Analysis", status: "planned" }
              ]
            },
            { name: "Plant Utilities Consumption", status: "planned", note: "HW, RW, Gas, Electrical" },
            { name: "AI Vision Analysis Dashboard", status: "live", url: URLS.aiVision }
          ]
        }
      ]
    },
    {
      name: "ENGINEERING UTILITY", 
      status: "category",
      url: URLS.engUtility,
      children: [
        {
          name: "By Phase", status: "planned",
          children: [
            { name: "Boiler", status: "planned" },
            { name: "Chiller", status: "planned" },
            { name: "Compressor", status: "planned" },
            { name: "Scrubber", status: "planned" },
            { name: "RWTP", status: "planned" },
            { name: "WWTP", status: "planned" }
          ]
        }
      ]
    },
    {
      name: "QUALITY ASSURANCE (QA)", 
      status: "category",
      url: URLS.qaLanding,
      children: [
        { name: "OOC Dashboard", status: "live", url: URLS.qaOoc },
        { name: "Product Control Limit Database", status: "demo", url: URLS.productControl, note: "To incorporate function to edit\nor rearrange parameter if possible" },
        { name: "Compounding Control Limit Database", status: "planned", url: URLS.compoundingControl },
        { name: "Control Plan & Documents", status: "planned" }
      ]
    },
    {
      name: "OPERATION EXCELLENCE (OE)", 
      status: "category",
      url: URLS.oeLanding,
      children: [
        { name: "Operation KPI Database", status: "demo", url: URLS.oeKpi, note: "For any KPI Threshold,\nEx: Line speed, OEE etc" }
      ]
    },
    {
      name: "DMS Health", status: "demo", url: URLS.dmsHealth, note: "Status for DMS Pipelines"
    }
  ]
};

function renderTree(nodeData, level = 0) {
    const li = document.createElement('li');
    li.classList.add('expanded'); // default state
    
    // Level 0 (Root) and Level 1 (Categories) are displayed side-by-side horizontally.
    // Level 2+ (Sub-categories) are displayed vertically.
    if (level <= 1) {
        li.classList.add('horizontal-item');
    } else {
        li.classList.add('vertical-item');
    }
    
    const nodeContent = document.createElement('div');
    nodeContent.className = `node-content status-${nodeData.status}`;
    if (nodeData.url) {
        nodeContent.classList.add('is-clickable');
        nodeContent.title = 'Open in a new tab';
    } else if (!nodeData.children || nodeData.children.length === 0) {
        nodeContent.classList.add('is-disabled');
        nodeContent.title = 'No page configured yet';
    }
    
    const hasChildren = nodeData.children && nodeData.children.length > 0;
    
    // Expand/Collapse Icon
    const iconSpan = document.createElement('span');
    iconSpan.className = 'node-expand-icon';
    if (hasChildren) {
        iconSpan.textContent = '-'; // Minus for expanded
    } else {
        iconSpan.classList.add('empty');
    }
    nodeContent.appendChild(iconSpan);
    
    // Text Group
    const textGroup = document.createElement('div');
    textGroup.className = 'node-text-group';

    // Title
    const titleSpan = document.createElement('div');
    titleSpan.className = 'node-title';
    titleSpan.textContent = nodeData.name;
    textGroup.appendChild(titleSpan);

    // Note
    if (nodeData.note) {
        const noteSpan = document.createElement('div');
        noteSpan.className = 'node-note';
        noteSpan.textContent = nodeData.note;
        textGroup.appendChild(noteSpan);
    }

    nodeContent.appendChild(textGroup);
    li.appendChild(nodeContent);

    // Add children
    if (hasChildren) {
        const ul = document.createElement('ul');
        if (level === 0) {
            ul.classList.add('horizontal-list');
        } else {
            ul.classList.add('vertical-list');
        }
        
        nodeData.children.forEach(child => {
            ul.appendChild(renderTree(child, level + 1));
        });
        li.appendChild(ul);

        // Click the icon to toggle without opening a configured dashboard/page.
        iconSpan.addEventListener('click', (event) => {
            event.stopPropagation();
            // Check dragging to prevent click
            if (!hasDragged) {
                const isExpanded = li.classList.contains('expanded');
                if (isExpanded) {
                    li.classList.remove('expanded');
                    iconSpan.textContent = '+';
                } else {
                    li.classList.add('expanded');
                    iconSpan.textContent = '-';
                }
            }
        });
    }

    nodeContent.addEventListener('click', () => {
        if (hasDragged) return;
        if (nodeData.url) {
            window.open(nodeData.url, '_blank', 'noopener,noreferrer');
        }
    });

    return li;
}

// Global Panning State
let scale = 1;
let panning = false;
let startX = 0;
let startY = 0;
let lastClickX = 0;
let lastClickY = 0;
let mouseDownX = 0;
let mouseDownY = 0;
let hasDragged = false;
let translateX = 0;
let translateY = 0;

function initPanZoom() {
    const container = document.getElementById('tree-container');
    const wrapper = document.getElementById('tree-wrapper');
    
    setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const treeRect = wrapper.getBoundingClientRect();
        
        if(treeRect.width > containerRect.width) {
            scale = Math.max(0.3, (containerRect.width - 100) / treeRect.width);
        }
        
        translateX = (containerRect.width - (treeRect.width * scale)) / 2;
        translateY = 40; 
        updateTransform();
    }, 100);

    container.addEventListener('mousedown', (e) => {
        panning = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        lastClickX = e.clientX;
        lastClickY = e.clientY;
        mouseDownX = e.clientX;
        mouseDownY = e.clientY;
        hasDragged = false;
        container.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
        panning = false;
        container.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
        if (!panning) return;
        if (Math.abs(e.clientX - mouseDownX) > 5 || Math.abs(e.clientY - mouseDownY) > 5) {
            hasDragged = true;
        }
        lastClickX = e.clientX;
        lastClickY = e.clientY;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    });

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY * -0.001;
        scale = Math.min(Math.max(0.15, scale + delta), 3);
        updateTransform();
    }, { passive: false });
}

function updateTransform() {
    const wrapper = document.getElementById('tree-wrapper');
    wrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-back').addEventListener('click', () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '../index.html';
        }
    });

    const treeRoot = document.getElementById('tree-root');
    treeRoot.appendChild(renderTree(treeData, 0));
    
    initPanZoom();
    
    document.getElementById('btn-expand').addEventListener('click', () => {
        document.querySelectorAll('li').forEach(li => {
            if (li.querySelector('ul')) {
                li.classList.add('expanded');
                li.querySelector('.node-expand-icon').textContent = '-';
            }
        });
    });
    
    document.getElementById('btn-collapse').addEventListener('click', () => {
        document.querySelectorAll('li').forEach(li => {
            if (li !== document.querySelector('#tree-root > li') && li.querySelector('ul')) {
                li.classList.remove('expanded');
                li.querySelector('.node-expand-icon').textContent = '+';
            }
        });
    });
});
