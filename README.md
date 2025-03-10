# Disclaimer #
Este aplicativo foi desenvolvido exclusivamente para fins acadêmicos como parte de um projeto de estudo e pesquisa. Não possui qualquer finalidade comercial ou lucrativa.

Além disso, não há intenção de infringir direitos autorais, marcas registradas ou qualquer propriedade intelectual relacionada a nomes, logotipos, imagens ou funcionalidades de aplicativos comerciais atualmente disponíveis no mercado.

Caso haja qualquer preocupação ou necessidade de ajuste em relação a direitos de terceiros, pedimos que entre em contato para que possamos tomar as devidas providências.

# Sobre #
Segunda entrega do Projeto Integrador: Desenvolvimento de Sistemas Orientado a Dispositivos Móveis e Baseados na Web do curso de Tecnólogo em Análise e Desenvolvimento de Sistemas.

### Grupo 02 ###
  - Bruno de Oliveira Contaifer
  - Carlos Eduardo Soares Pedro
  - Cleiton Conde Pinto
  - Gabrielle Trivelato Silva
  - Victor Hugo MIlani

# 1. Pré-Requisitos #
Para a execução do nosso aplicativo Medical App, é necessário utilizar um dos seguintes métodos:

  - Computador com Sistema Operacional Windows.
  - Emulador Android: Utilizando um dispositivo virtual (AVD) no Android Studio.
  - Smartphone Android: Executando o aplicativo via Expo Go.

A seguir, detalhamos os passos necessários para cada opção.

## 1.1. Instalação do Android Studio ##
O Android Studio é a IDE oficial para desenvolvimento Android e inclui um emulador para testar aplicativos sem a necessidade de um dispositivo físico.

### Passo a Passo para Instalar o Android Studio: ###
1. Baixar o Android Studio
   - Acesse o site oficial: https://developer.android.com/studio.
   - Faça o download da versão compatível com seu sistema operacional (Windows, macOS ou Linux).

2. Instalar o Android Studio
   - Execute o instalador baixado.
   - Siga as instruções do assistente de instalação.
   - Certifique-se de marcar a opção para instalar o Android Virtual Device (AVD), que permite a criação de um emulador.

3. Configurar o Emulador Android (AVD)
   - Abra o Android Studio, clique em "More Actions" e depois em "Virtual Device Manager".
   - Clique em "Create Virtual Device..." (Criar Dispositivo Virtual)
   - Escolha um modelo de smartphone virtual (exemplo: Pixel 5).
   - Selecione uma versão do Android recomendada (API 30 ou superior).
   - Finalize a configuração e inicie o emulador.

## 1.2. Instalação do Expo Go (Para Dispositivo Físico) ##
Caso o usuário opte por testar o aplicativo em um smartphone Android, será necessário instalar o Expo Go.

### Passo a Passo para Instalar o Expo Go: ###
1. Acesse a Play Store
   - No seu smartphone, abra a Google Play Store.

2. Baixe o Expo Go
   - Pesquise por "Expo Go" na loja.
   - Toque em Instalar e aguarde a conclusão.
   - Abra ao Aplicativo Expo Go

Após a instalação, o aplicativo estará pronto para ser utilizado para rodar o projeto.

# 2. Download e Instalação do Projeto Medical App #

Uma vez que o emulador Android ou o dispositivo físico estão prontos para executar o aplicativo Medical App, é hora de fazer o download do código fonte e a instalação de todos os softwares e dependências do projeto. Para isso, siga os seguintes passos:

1. Acesse https://github.com/vhmilani/medical-app e clone o projeto para o seu computador.
   - Na tela inicial clique em "Code" e selecione a forma de sua preferência (HTTPS, SSH, GitHub CLI ou Download .ZIP).

2. Execute o arquivo setup.bat (preferencialmente como administrador) para a instalação de softwares (Open SSL, Node JS e MongoDB) e dependências do projeto (npm install). Abaixo um resumo dos itens executados pelo arquivo setup.bat:
   - Instalação do Open SSL via comando winget install -e --id FireDaemon.OpenSSL para descriptografar o arquivo .env
   - Instalação do NodeJS via comando winget install OpenJS.NodeJS.
   - Instalação do MongoDB via comando winget install MongoDB.Server.
   - Criação do arquivo api.js com IP do computador atual (Necessário para execução das APIs).
   - Descriptografia do arquivo .env via senha fornecida.
   - Instalação das dependências do backend via comando npm install.
   - Execução do servidor backend via comando npm start.
   - Instalação das dependências do frontend via comando npm install.
   - Instalação do @expo/ngrok@^4.1.0 para criação dos túneis e execução do aplicativo em dispositivo físico.
   - Instalação das dependências do projeto expo via comando npx expo install.
   - Inicialização do servidor frontend via comando npx expo start --tunnel.
  
3. Aguarde a instalação de todos os componentes. Caso necessário (se setup.bat não executado como administrador) aceite as permissões para a instalação de cada um dos componentes.

4. Durante o processo será solicitada uma senha para descriptografar o arquivo .env. Esta senha pode ser encontrada no AVA, na área de entrega do projeto e também na documentação atualizada.

5. Caso durante o processo de descriptografia do arquivo .env a seguinte mensagem de erro apareça: `Erro ao localizar OpenSSL nas variaveis de ambiente. Encerre o terminal e execute setup.bat novamente.` feche o terminal e execute o setup.bat novamente.

6. Digite a senha para descriptografar o arquivo .env e aguarde o término da instalação.

7. Quando as dependências do backend estiverem instaladas e o servidor inicializado, aparecerá uma tela informando que o servidor está executando e o MongoDB está conectado.<br>
   `Servidor rodando na porta 5000`<br>
		`MongoDB conectado`

8. Quando as dependências do frontend estiverem instaladas e o servidor inicializado, aparecerá uma tela com um QR Code (para leitura em dispositivo físico) e opções do Expo (para execução em emulador).

# 3. Executando o aplicativo no emulador Android. #
Para executar o aplicativo no emulador Android siga os seguintes passos:

1. Inicie o emulador Android no Virtual Device Manager do Android Studio.
2. Na tela do servidor frontend (Tela CMD com o QR Code), pressione a tecla A (open Android).
3. Aguarde a abertura do aplicativo no emulador.

# 4. Executando o aplicativo no dispositivo físico (Android). #
Para executar o aplicativo no dispositivo físico siga os seguintes passos:

1. Abra o aplicativo Expo Go no dispositivo físico.
2. Clique em "Scan QR Code".
3. Faça a leitura do QR Code da tela do servidor frontend.
4. Aguarde a abertura do aplicativo no dispositivo físico.
