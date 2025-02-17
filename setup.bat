@echo off
echo 🚀 Iniciando a configuração do ambiente...

:: 1️⃣ Atualizar pacotes e instalar dependências essenciais
echo 📦 Instalando dependências do sistema...
winget install Node.js
winget install MongoDB
winget install Git
winget install -e --id FireDaemon.OpenSSL

set /p PASSWORD=Digite a senha para descriptografar o .env:

openssl enc -aes-256-cbc -d -salt -in backend/.env.enc -out backend/.env -pass pass:%PASSWORD%

:: 2️⃣ Configurar backend
echo 🔧 Configurando backend...
cd backend
call npm install
net start MongoDB
call npm run migrate
start npm start
cd ..

:: 3️⃣ Configurar frontend
echo 🎨 Configurando frontend...
cd frontend-mobile
call npm install
call npx expo install
start npx expo start --android
cd ..

echo ✅ Configuração concluída! O backend e o frontend estão rodando.