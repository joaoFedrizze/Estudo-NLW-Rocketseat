Bom dia a todos, eu sou João Fedrizze, e esse é o projeto de estudo que eu fiz para me atualizar um pouco mais em bibliotecas e ferramentas de trabalho atuais para desenvolvimento web app.

Esse projeto ele está dividido em quatro partes, sendo elas ``HTML``, ``Express``, ``React`` e ``expo``.

Estou grato por você estar lendo este read-me, então vamos para a instalação do projeto? 

## Estrutura do projeto

Como mencionado, esse projeto está dividido em quatro partes, esse projeto foi um projeto de estudo realizado pela [Rocketseat](https://www.rocketseat.com.br/) e nele está dividido em dois módulos, o primeiro que é chamado de Explorer, que é um curso para iniciantes, eu realizei ele para ajudar amigos que estão iniciando e para compartilhar com ele o progresso do desenvolvimento.

O segundo modulo é com nomenclatura de Ignite, ele já é uma versão bem mais avançada do mesmo projeto, para que você consiga utilizar ele, é preciso usar a versão [18.14.2 LTS do nodeJS](https://nodejs.org/en/)  e nele contem três subpastas:

- ``./ignite/server``: Esta pasta é importante estar em funcionamento para que todos projetos possam compartilhar informações, pois nela também está alocado um banco de dados de ``SQLite``.
- ``./ignite/web``: Esse projeto é o Front-end web da aplicação, ele que é responsável por permitir que as pessoas abram o projeto nos navegadores
- ``./ignite/mobile``: Esse é o aplicativo da aplicação, foi utilizado o expo para o estudo do projeto, então a build dele foi feita direto com o celular no próprio aplicativo da ``expo``

## Executando o HTML

Esse é o mais simples, primeiramente você abre o diretório ``./explorer`` e clica duas vezes no arquivo ``index.html``, ou pode simplesmente clicar com botão direito e abrir como um navegador a sua escolha.

## Importante!

Para executar quaisquer outras pastas do Ignite é importante ter instalado o [NodeJS](https://nodejs.org/en/) para executar qualquer aplicação.

1. pressione no teclado ``win + R`` e digite ``cmd``, você pode utilizar um terminal a sua preferência que funcione o NodeJS. Para verificar se foi instalado corretamente o NodeJS execute ``node --version``

## Server

Para executar o servidor primeiramente precisamos criar o arquivo ``.env``

Q: ``Por que você adicionou um git Ignore em um arquivo importante para a instalação?``<br/>
R: ``Porque o arquivo .env contem informações que não são seguras compartilhar em um repositório publico, mas, mesmo assim, como esse é um projeto de estudo vou deixar como recriar esse arquivo.``

### Recriando .env

1. Busque pelo diretório ``./ignite/server`` e crie um arquivo ``.env``
2. Abra com um editor de texto e adicione a seguinte linha nele e salve o arquivo: 
```
DATABASE_URL="file:./dev.db"
```

### Executando o servidor

1. Navegue até o diretório ``./ignite/server`` vamos instalar as dependências então executamos o comando ``node install``
2. Para executar a aplicação do server execute ``npm run dev``

### Prisma studio

Esse projeto foi utilizado a dependencia do prisma para fazer a comunicação com o banco de dados, e ele tem um modo chamado de studio, onde você pode acessar o banco de dados de uma maneira visual, para isso é preciso executar ``npx prisma studio`` logo um navegador irá abrir com o banco ou um endereço para digitar na URL do navegador aparecerá no console.

## Front-End

O Front-end é muito similar ao server/back-end entretanto não iremos criar o arquivo ``.env`` nele, então

1. Entre no diretório ``./ignite/web`` e insira o comando ``npm install``
2. Para executar a aplicação apenas insira ``npm run dev``

## Mobile

O mobile foi utilizado um frame-work chamado `[expo](https://expo.dev/), existem várias maneiras de fazer build da aplicação, entretanto, vou deixar o passo a passo mais simples de como testar.

1. Entre no diretório ``./ignite/mobile`` execute o comando ``npm install``
2. Execute o comando ``npx expo start``
3. Uma QR code aparecera na tela, ele não funcionará em um navegador, então é preciso instalar o aplicativo do expo ou no [android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) ou no [apple](https://apps.apple.com/app/apple-store/id982107779) para inserir o endereço ou escanear o QR code

## Obrigado

Obrigado a [Rocketseat](https://www.rocketseat.com.br/) por me proporcionar essa experiência, nesse estudo eu aprendi maneiras novas de organizar meus projetos que nem imaginava que eram possíveis, fiz amigos ao longo do desenvolvimento que estavam lado a lado com esse estudo, e me atualizei em ferramentas e bibliotecas que circulam esse mercado de trabalho.
