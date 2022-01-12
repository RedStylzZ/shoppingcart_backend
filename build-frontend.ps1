ECHO OFF
ECHO ---------------------
ECHO "Erstelle Zielpfad..."
ECHO ---------------------
mkdir backend\src\main\resources\static

ECHO ---------------------
ECHO "Baue Frontend..."
ECHO ---------------------
cd frontend
npm install
npm run build
cd ..

ECHO ---------------------
ECHO "Kopiere Frontend..."
ECHO ---------------------
Copy-Item -Path .\frontend\build\* -Destination .\backend\src\main\resources\static -Recurse -Force