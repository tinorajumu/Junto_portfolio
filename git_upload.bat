@echo off
chcp 65001 > nul
setlocal

cd /d "%~dp0"

for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set DATE_STR=%%a/%%b/%%c
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set TIME_STR=%%a:%%b
set COMMIT_MSG=update %DATE_STR% %TIME_STR%

echo.
echo === Changed files ===
git status --short
echo.

git add -A
if %errorlevel% neq 0 (
    echo.
    echo [!] git add failed.
    pause
    exit /b 1
)

git diff --cached --quiet
if %errorlevel% equ 0 (
    echo.
    echo [!] Staged changes are empty.
    pause
    exit /b 1
)

git commit -m "%COMMIT_MSG%"

if %errorlevel% neq 0 (
    echo.
    echo [!] Commit failed. No changes or an error occurred.
    pause
    exit /b 1
)

echo.
echo === Pushing to main... ===
git push origin HEAD:main

if %errorlevel% neq 0 (
    echo.
    echo [!] Push failed. Check your credentials.
    pause
    exit /b 1
)

echo.
echo === Done! ===
echo https://github.com/tinorajumu/Junto_portfolio
echo https://tinorajumu.github.io/Junto_portfolio/
echo.
pause
