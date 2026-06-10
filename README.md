This project serve as a DMS Webpage Demo for user before any official development or deployment is made.

Any function available on the webpage can be referred to link below:
https://excalidraw.com/#json=QNHjHtxjJyNibgtOR1aqU,fdDL33ngA-Yx1t04yNmH6Q

Webpage can be accessed through: https://lwchean94-hash.github.io/DMS-Webpage/

Production Control Limit Database dual mode:
- GitHub Pages / direct HTML opens in Demo Mode. Data is saved only in the current browser, with export/import available for transfer.
- Local SQLite Mode requires Node.js. Double-click `start_production_control_limit_db.bat`, then open:
  http://localhost:8080/qa_details/hartalega_product_control_limit_db.html
- SQLite data is saved in `data/production_control_limits.sqlite`.
- No-server portable persistence is available through Save File Mode. Open the page directly, click `Load File`, and keep `production_control_limits.save.json` together with the project folder when transferring to another PC. Use `Download Save Copy` to create or update the JSON save file.
- Bulk upload uses the page's `Download Upload Format` button. The template contains a `Version` sheet with `Apply Plants` / `Apply Lines` scope fields and a `Limits` sheet with the fixed numbered parameter list.
