import 'dotenv/config';
import { User } from '../User/userEntity';
import { AppDataSource } from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class authService {
    private repo = AppDataSource.getRepository(User);

    async exeLogin(emailReq: string, passwordReq: string) {
        
        const user = await this.repo.findOneBy({ email: emailReq });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(passwordReq, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
        return {
            User: {
                id: user.id,
                email: user.email
            },
            token
        }
    }
}