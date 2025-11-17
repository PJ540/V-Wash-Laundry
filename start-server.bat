@echo off
echo ========================================
echo V-Wash Laundry Backend Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Please copy .env.example to .env and configure it.
    echo.
    pause
    exit /b 1
)

echo Starting server...
echo Server will run on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

npm start
