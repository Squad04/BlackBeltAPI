# BlackBelt IT - Porto Digital

## API

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

Após a instalação, para rodar o servidor já transpilado, é necessário ter o **Docker** instalado na máquina e suas variáveis de ambiente setadas corretamente no arquivo `.env`.

Tendo o Docker instalado, rode o comando:

```bash
docker compose --env-file .env up --build
```

Onde o docker irá ler o arquivo `docker-compose.yml`, setar as variáveis de ambiente e subir o container, executando o MySQL e a API. Depois da primeira vez com o projeto buildado, não é mais necessário usar a opção `--build`.

Os demais comandos se encontram no arquivo `package.json` na raiz do projeto.
