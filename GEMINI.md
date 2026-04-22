# Portfolio API - Production Guide

Este documento resume as configurações e o fluxo de deploy para o ambiente de produção da **Portfolio API**.

## 🚀 Tecnologias Principais
- **Framework:** NestJS (v11+)
- **Banco de Dados:** PostgreSQL (Hospedado na UOL Host)
- **Containerização:** Docker (Multi-stage Build)
- **Hospedagem:** Render

## 🛠️ Configurações Realizadas para Produção

### 1. Dockerfile Otimizado
O projeto utiliza um `Dockerfile` de três estágios (Builder, Deps, Runner) baseado em **Node:22-alpine**.
- **Vantagem:** Redução do tamanho da imagem e maior segurança ao remover o código-fonte e dependências de desenvolvimento do ambiente final.

### 2. Banco de Dados e SSL
A configuração no `AppModule.ts` foi ajustada para:
- Suportar variáveis de ambiente dinâmicas.
- Suportar conexões SSL (necessário para provedores como Neon/AWS, configurável via `DB_SSL`).
- Compatibilidade de nomes de variáveis: `DB_USERNAME` / `DB_USER` e `DB_NAME` / `DB_DATABASE`.

### 3. Porta Dinâmica
O arquivo `src/main.ts` foi alterado para escutar na porta definida pela variável de ambiente `PORT` (padrão `8080`), permitindo que serviços como o Render injetem a porta correta automaticamente.

## 📦 Variáveis de Ambiente Necessárias
No **Render**, configure as seguintes variáveis na aba **Environment**:

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `NODE_ENV` | Ambiente da aplicação | `production` |
| `PORT` | Porta da API | `8080` |
| `DB_HOST` | Host do PostgreSQL (UOL) | `sql.uhserver.com` |
| `DB_PORT` | Porta do PostgreSQL | `5432` |
| `DB_USERNAME` | Usuário do banco | `user_prod` |
| `DB_PASSWORD` | Senha do banco | `********` |
| `DB_NAME` | Nome do banco de dados | `db_portfolio` |
| `DB_SSL` | Habilitar SSL (true/false) | `false` |
| `API_KEY` | Chave para rotas protegidas | `sua-chave-secreta` |

## 🚢 Passo a Passo para Deploy no Render

1.  **GitHub:** Faça o push do código atualizado para o seu repositório.
2.  **Web Service:** No Render, crie um novo **Web Service**.
3.  **Runtime:** Selecione **Docker**.
4.  **Variáveis:** Adicione as variáveis listadas acima.
5.  **Build & Deploy:** O Render detectará o `Dockerfile` e iniciará o build automaticamente.

---
*Documento gerado pelo Gemini CLI em 22 de Abril de 2026.*
