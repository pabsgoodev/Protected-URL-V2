# Auth API — Backend

This project is an **authentication API** built with a strong focus on clean architecture, type safety, and backend best practices.

## Purpose

The goal of this project is to demonstrate how to build a scalable backend using **Node.js** and **TypeScript**, applying concepts such as:

* Separation of concerns
* Error handling without `throw`
* Strong typing with the `Result` pattern
* **Package-by-feature** architecture

## Features

* User authentication
* Password hashing with **bcrypt**
* JWT token generation
* Error handling using the `[data, error]` pattern
* Strongly typed codebase
* Scalable project structure

## Technologies

### Backend

* Node.js
* Express
* TypeScript
* TypeORM
* JSON Web Token (JWT)
* bcrypt

### Database

* Configured through TypeORM (database-agnostic)

## Project Structure

The project follows the **package-by-feature** architecture, where each feature is organized into its own module.

```text
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
```

## Return Pattern

The application uses a functional approach for error handling:

```ts
[data, error]
```

### Success

```ts
[{ user, token }, null]
```

### Error

```ts
[null, Error]
```

This approach avoids using `throw` for expected application errors and makes the control flow more predictable.

## Environment Variables

Create a `.env` file based on the following template:

```env
JWT_SECRET=
PORT=
```

## Running the Project

```bash
npm install
npm run dev
```

## Notes

* Built for learning purposes and portfolio projects.
* Designed with scalability in mind.
* Easy to extend with new modules such as authentication, posts, comments, and more.

## Project Status

* **Type:** Backend API
* **Purpose:** Portfolio / Learning
* **Status:** In Development
