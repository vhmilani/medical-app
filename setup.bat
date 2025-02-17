@echo off
echo 🚀 Iniciando a configuração do ambiente...

:: 1️⃣ Verificar se o script está sendo executado como Administrador
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ Por favor, execute este script como Administrador!
    pause
    exit /b
)

:: 2️⃣ Verificar se o Node.js está instalado
where npm >nul 2>&1
if %errorLevel% neq 0 (
    echo 📦 Node.js não encontrado! Instalando via winget...
    winget install OpenJS.NodeJS.LTS
) else (
    echo ✅ Node.js já está instalado.
)

:: 3️⃣ Verificar se o OpenSSL está instalado
where openssl >nul 2>&1
if %errorLevel% neq 0 (
    echo 🔑 Instalando OpenSSL...
    winget install -e --id ShiningLight.OpenSSL
) else (
    echo ✅ OpenSSL já está instalado.
)

:: 4️⃣ Solicitar a senha do usuário para descriptografar o .env
set /p PASSWORD=Digite a senha para descriptografar o .env:
openssl enc -aes-256-cbc -d -salt -in backend/.env.enc -out backend/.env -pass pass:%PASSWORD%

:: 5️⃣ Verificar se a descriptografia foi bem-sucedida
if %errorLevel% neq 0 (
    echo ❌ Erro ao descriptografar o arquivo! Verifique a senha digitada.
    pause
    exit /b
) else (
    echo ✅ Arquivo .env descriptografado com sucesso!
)

:: 6️⃣ Instalar dependências do backend
echo 🔧 Instalando dependências do backend...
cd backend
call npm install
start cmd /k "npm start"
cd ..

:: 7️⃣ Instalar dependências do frontend
echo 🎨 Instalando dependências do frontend...
cd frontend-mobile
call npm install
call npx expo install
start cmd /k "npx expo start --android"
cd ..

echo ✅ Configuração concluída! O backend e o frontend estão rodando.