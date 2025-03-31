@echo off
setlocal
echo %~f1
node C:\Github\img-resize\index.js "%~f1" %2
