@echo off
cd /d "%~dp0"
echo Starting Hartalega Foresight local SQLite server...
echo.
echo Open this URL after the server starts:
echo http://localhost:8080/qa_details/hartalega_product_control_limit_db.html
echo.
node server.js
pause
