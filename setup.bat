@echo off
echo 🚀 Iniciando a configuração do ambiente...

:: 1️⃣ Atualizar pacotes e instalar dependências essenciais
echo 📦 Instalando dependências do sistema...
winget install Node.js
winget install MongoDB
winget install Git

:: 2️⃣ Configurar backend
echo 🔧 Configurando backend...
cd backend
npm install
copy .env.example .env
net start MongoDB
npm run migrate
start npm start
cd ..

:: 3️⃣ Configurar frontend
echo 🎨 Configurando frontend...
cd frontend-mobile
npm install
npx expo install
start npm start
cd ..

echo ✅ Configuração concluída! O backend e o frontend estão rodando.
pause
