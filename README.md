# BlackBelt IT - Porto Digital

## Cybersensei API

Projeto feito em conjunto com o Porto Digital e a empresa BlackBelt IT.

### Rodar o projeto

Este projeto é construído em Node.JS `18.18.0` e no NPM `9.8.1`.

Para executar o projeto, primeiro clone este repositório:

```bash
git clone git@github.com:Squad04/BlackBeltAPI.git
```

Tendo clonado o projeto, acesse o diretório do projeto e execute o comando para instalar todas as dependências:

```bash
npm install
```

> Necessário ter o **Docker** instalado na máquina e suas variáveis de ambiente setadas corretamente no arquivo `.env`.

Após a instalação, é necessário que se configure o Prisma ORM tanto localmente e tanto no container Docker, pois caso contrário o processo de build irá falhar.

Crie seu arquivo `.env` na raiz do projeto de acordo com o arquivo `.env.example` que está no repositório e preencha as credenciais.

A variável `DATABASE_URL` precisará ser primeiro configurada na seguinte estrutura:

```env
DATABASE_URL=mysql://usuario:senha@host:porta/nome_do_banco?schema=public&connect_timeout=300
```

Localmente, o host é `localhost`. No `docker-compose.yml`, a porta exposta para que o MySQL rode é a **3308**, porém dentro do container é **3306**

Então, o `DATABASE_URL` será para o local `mysql://usuario:senha@localhost:3308/nome_do_banco`.

Configurado isso corretamente, dado que o `schema.prisma` usa também a variável de ambiente `DATABASE_URL`, execute os comandos:

```bash
npx prisma generate

npx prisma db push
```

Isso já executa as migrações e também adiciona às mudanças ao banco de dados *localmente*.

Agora mude o `DATABASE_URL` no `.env` para `mysql://usuario:senha@db:3306/nome_do_banco`, dado que será assim que ele irá executar internamente no container.

Tendo o Docker instalado, rode o comando:

```bash
docker compose --env-file .env up --build
```

Esse comando usará o arquivo `.env` na raiz do projeto como base para que busque as variáveis de ambiente que são solicitadas no arquivo `docker-compose.yml`.

Se a aplicação conseguir ser executada sem nenhum erro, abra outro terminal (ou rode depois com a opção `-d` no comando de `docker compose` para que ele rode sem travar o terminal) e execute as migrações dentro do container:

```bash
docker exec api_blackbelt npx prisma generate

docker exec api_blackbelt npx prisma db push
```

Isso garantirá que já internamente o MySQL estará com o banco atualizado de acordo com o Prisma.

### Seed

Na aplicação, há um arquivo chamado `adminSeeder.ts`. Configure seu email e senha lá, pois será a configuração da role de admistrador da aplicação. Nessa API é necessário tanto que o usuário tenha um token JWT válido para acessar os recursos (exceto login e criação de conta), mas também alguns recursos são acessíveis só para os admins da aplicação.

No `package.json`, há um comando configurado como `npm run seed:admin` em que ele fará a criação tanto da role de admin como da conta de admin. Rode ele no Docker por meio do `docker exec api_blackbelt npm run seed:admin` e você já terá role e conta criada para agir como administrador.

Os demais comandos se encontram no arquivo `package.json` na raiz do projeto.
