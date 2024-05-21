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

Veja que o `host` do banco não é o `localhost`, e sim o nome do serviço que está descrito no `docker-compose.yml`, que é `db`. E como tudo será executado internamente, não será ouvido na porta que foi exposta (**3308**), e sim na porta interna do container, **3306**.

Tendo feito essa configuração e configurando o restante das variáveis de ambiente, com o Docker instalado, rode o comando:

```bash
docker compose --env-file .env up --build
```

Isso copiará as pastas para o container, fará o *build* da aplicação e também construirá o banco de dados da maneira que foi definida no arquivo `schema.prisma`.

### Seed

Na aplicação, há um arquivo chamado `adminSeeder.ts`. Configure seu email e senha lá, pois será a configuração da role de admistrador da aplicação. Nessa API é necessário tanto que o usuário tenha um token JWT válido para acessar os recursos (exceto login e criação de conta), mas também alguns recursos são acessíveis só para os admins da aplicação.

No `package.json`, há um comando configurado como `npm run seed:admin` em que ele fará a criação tanto da role de admin como da conta de admin. Rode ele no Docker por meio do `docker exec api_blackbelt npm run seed:admin` e você já terá role e conta criada para agir como administrador.

Os demais comandos se encontram no arquivo `package.json` na raiz do projeto.
