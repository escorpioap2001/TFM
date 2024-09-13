@echo off

cd ./Backup
start ng serve
cd ..

cd ./datos
start json-server --watch db.json
cd ..
