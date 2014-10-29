set TESTVAR="No Value"
ECHO var = %TESTVAR%


cd "C:\Users\Brandon\Google Drive\BP Lib\"
mkdir "Dragon Game BACKUP %date:/=% %TIME:~0,2% %TIME:~3,2%"
xcopy "Dragon Game" /S "Dragon Game BACKUP %date:/=% %TIME:~0,2% %TIME:~3,2%"

%pause