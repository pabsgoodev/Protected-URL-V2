import 'dotenv/config';
import { User } from '../User/userEntity';
import { AppDataSource } from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { email } from 'zod';

type result<T, E> = readonly [T, null] | readonly [null, E];

export class authService {
    private repo = AppDataSource.getRepository(User);
    async exeLogin(
        emailReq: string, 
        passwordReq: string): Promise<result<{ user: { id: number, email: string }, token: string }, Error>> {
        
        const user = await this.repo.findOneBy({ email: emailReq });
        if (!user) {
            return [null, new Error('User not found')] as const;
        }

        const isPasswordValid = await bcrypt.compare(passwordReq, user.password);
        if (!isPasswordValid) {
            return [null, new Error('Invalid password')] as const;
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
        return [{
            user: { id: user.id, 
            email: user.email 
        },
        token
    }, null] as const;
    }

    async exeRegister(
        emailReq: string, 
        passwordReq: string): Promise<result<{ user: { id: number, email: string }, token: string }, Error>> {

            const user = await this.repo.findOne({ where: { email: emailReq } });
            if(user){
                return [null, new Error('User already exists')] as const;
            }

            const hashPass = await bcrypt.hash(passwordReq, 12);

            const userInstance = this.repo.create({
                email: emailReq,
                password: hashPass
            })

            const newUser = await this.repo.save(userInstance);
            await this.repo.save(newUser);

            const token = jwt.sign(
                { userId: newUser.id },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            return [{
                user: { id: newUser.id, email: newUser.email },
                token
            }, null] as const;
    }
}