```md
# Auth API — Backend

Este projeto é uma **API de autenticação**, desenvolvida com foco em organização, tipagem forte e boas práticas de backend.

## Objetivo

Demonstrar a construção de uma API utilizando Node.js com TypeScript, aplicando conceitos como:

- Separação de responsabilidades
- Tratamento de erros sem `throw`
- Tipagem segura com `Result`
- Arquitetura **package by features**

## Características

- Autenticação de usuários (login)
- Criptografia de senha com bcrypt
- Geração de token com JWT
- Tratamento de erros com padrão `[data, error]`
- Código fortemente tipado
- Estrutura escalável

## Tecnologias utilizadas

### Backend
- Node.js
- Express
- TypeScript
- TypeORM
- JWT (jsonwebtoken)
- bcrypt

### Banco de dados
- Configurado via TypeORM (adaptável)

## Estrutura do projeto

O projeto segue o padrão **package by features**, onde cada funcionalidade é isolada:

```

src/
├── User/
│   ├── userEntity.ts
│   ├── userService.ts
│   ├── userController.ts
│
├── database/
│   ├── connection.ts
│
├── app.ts
├── server.ts

````

## Padrão de retorno

A aplicação utiliza um padrão funcional para tratamento de erros:

```ts
[data, error]
````

### Exemplo:

* Sucesso:

```ts
[{ user, token }, null]
```

* Erro:

```ts
[null, Error]
```

Isso evita uso de `throw` e torna o fluxo mais previsível.

## Variáveis de ambiente

Crie um arquivo `.env` baseado no exemplo:

```
JWT_SECRET=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

## Como rodar o projeto

```bash
npm install
npm run dev
```

## Observações

* Projeto voltado para aprendizado e portfólio
* Estrutura pensada para crescimento
* Fácil adaptação para novos módulos (ex: auth, posts, etc.)

## Status do projeto

* Tipo: Backend
* Uso: Portfólio / Estudo
* Estado: Em desenvolvimento

```
```
