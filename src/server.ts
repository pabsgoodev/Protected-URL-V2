import express from 'express';
import 'dotenv/config'; // SEMPRE IMPORTAR ISTO 
import { AppDataSource } from './database/connection';
import { createUser } from './User/userSetup';
import router from './User/userRoutes';
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT
if (!process.env.PORT) {
    throw new Error('PORT não definida');
}


AppDataSource.initialize()
    .then(async () => {
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        await createUser();
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });

//ERROS DO CODIGO ABAIXO

//Chamar o "AppDataSource.initialize()" mais de uma vez. Só deve ser chamado no server.ts
//O createUser() chamado antes da AppDataSource.initialize(), o que causa erro de conexão com o banco de dados. O createUser() deve ser chamado dentro do .then() do 
// AppDataSource.initialize() para garantir que a conexão seja estabelecida antes de tentar criar um usuário.
// se o standardHeaders: false estiver true, a aplicação vai dar erro


//________________________________ FIM___________________________________________________________

// Testando a API com curl:

//┌──(pabloodev㉿kali)-[~]
//└─$ curl -X POST http://localhost:3000/api \
//-H "Content-Type: application/json" \
//-d '{"email":"admin123@gmail.com","password":"password123"}'
//{"User":{"id":1,"email":"admin123@gmail.com"},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3NTQyODA2MiwiZXhwIjoxNzc1NDMxNjYyfQ.td0ruIuUOOI2J3mhr6WG0sVgXruy7zva3ODMd6K0iYE"}                                                                             
//┌──(pabloodev㉿kali)-[~]
//└─$

//curl http://localhost:3000/rota-protegida \
//-H "Authorization: Bearer SEU_TOKEN_AQUI"

//________________________________FIM____________________________________________________________