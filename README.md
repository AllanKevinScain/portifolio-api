Passo a passo para construir a API nest.

1. nest new ...<br/>
2. limpar os arquivos<br/>
3. escolher porta<br/>
4. nest g resource ...<br/>
5. mudar a entidade para ...Entity<br/>
6. Adiciona compose:<br/>

```docker
version: '3.7'

services:
  postgres:
    image: 'bitnami/postgresql:latest'
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_USER=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=portifolio
    volumes:
      - portifolio_data:/bitnami/postgresql

volumes:
  portifolio_data:

```

7. organizar env:

```txt
NODE_ENV="development"

# Postgres (Host)
DB_HOST="localhost"
DB_USER="docker"
DB_PASSWORD="docker"
DB_PORT="5432"
DB_DATABASE="portifolio"
```
