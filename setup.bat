@echo off

cd /d "%~dp0"

echo Iniciando a configuração do ambiente...

:: Verificar se o OpenSSL está instalado
where openssl >nul 2>&1
if %errorLevel% neq 0 (
    echo Instalando OpenSSL...
    winget install -e --id FireDaemon.OpenSSL
    for /f "tokens=2*" %%A in ('reg query "HKLM\SOFTWARE\OpenSSL" /v InstallPath') do set OPENSSL_PATH=%%B
    setx PATH "%PATH%;%OPENSSL_PATH%\bin"
) else (
    echo OpenSSL já está instalado.
)

:: Verificar se o Node.js está instalado
where node -v >nul 2>&1
if %errorLevel% neq 0 (
    echo Node.js não encontrado! Instalando via winget...
    winget install OpenJS.NodeJS
    for /f "tokens=2*" %%A in ('reg query "HKLM\SOFTWARE\Node.js" /v InstallPath') do set NODE_PATH=%%B
    setx PATH "%PATH%;%NODE_PATH%"
) else (
    echo Node.js já está instalado.
)

:: Verificar se o MongoDB está instalado
where mongod --version >nul 2>&1
if %errorLevel% neq 0 (
    echo Instalando MongoDB...
    winget install MongoDB.Server
    for /f "tokens=2*" %%A in ('reg query "HKLM\SOFTWARE\MongoDB, Inc.\MongoDB Server" /v CurrentVersion') do set MONGO_VERSION=%%B
    for /f "tokens=2*" %%A in ('reg query "HKLM\SOFTWARE\MongoDB, Inc.\MongoDB Server\%MONGO_VERSION%" /v InstallPath') do set MONGO_PATH=%%B
    setx PATH "%PATH%;%MONGO_PATH%\bin"
) else (
    echo MongoDB já está instalado.
)

:: Criação do arquivo api.js
mkdir frontend-mobile\src\config

:: Obtém o IP do computador
setlocal enabledelayedexpansion
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /C:"IPv4"') do set IP=%%A
set IP=%IP:~1%

:: Criar o arquivo api.js com o IP dinâmico
(
echo export const API_URL = "http://%IP%:5000/api";
) > frontend-mobile\src\config\api.js

echo Arquivo api.js criado com sucesso com o IP: %IP%

:: Solicitar a senha do usuário para descriptografar o .env
set /p PASSWORD=Digite a senha para descriptografar o .env:
openssl enc -aes-256-cbc -d -salt -in backend/.env.enc -out backend/.env -pass pass:%PASSWORD%

:: Verificar se a descriptografia foi bem-sucedida
if %errorLevel% neq 0 (
    where openssl >nul 2>&1
    if %errorLevel% neq 0 (
        echo Erro ao localizar OpenSSL nas variaveis de ambiente. Encerre o terminal e execute setup.bat novamente.
        pause
        exit
    ) else (
        echo Erro ao descriptografar o arquivo! Verifique a senha digitada e execute setup.bat novamente.
        pause
        exit
    )
) else (
    echo Arquivo .env descriptografado com sucesso!
)

:: Instalar dependências do backend
echo Instalando dependências do backend...
cd backend
call npm install
start cmd /k "npm start"
cd ..

:: Instalar dependências do frontend
echo Instalando dependências do frontend...
cd frontend-mobile
call npm install
call npm install --global @expo/ngrok@^4.1.0
call npx expo install
start cmd /k "npx expo start --tunnel"

cd ..

echo Configuração concluída! O backend e o frontend estão rodando.

exit