import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../User/userEntity"

export const AppDataSource = new DataSource({
    type: "mariadb",    
    host: "localhost",
    port: 3306,
    username: "root",
    password: "silvablo",
    database: "userJwt",
    entities: [User],
    synchronize: true,
    logging: false,
    migrations: ['./src/database/migrations/*.ts'],
    subscribers: ['./src/database/subscribers/*.ts'],
})