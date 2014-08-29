@echo off

:start

for %%a in (./src/*) do set FileDate=%%~ta

@timeout /t 1 /nobreak > NUL

echo Loop...

goto start