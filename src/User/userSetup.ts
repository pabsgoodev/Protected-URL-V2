import bcrypt from 'bcrypt';
import { User } from '../User/userEntity';
import { AppDataSource } from '../database/connection';

export async function createUser() {
    const repo = AppDataSource.getRepository('User');
    const hash = await bcrypt.hash('password123', 12);

    const user = new User();

    user.email = "admin123@gmail.com"
    user.password = hash;

    await repo.save(user)
    console.log('User created successfully');
}
