import { Request, Response } from 'express';
import { authService } from './userService';
import z from 'zod';

export class UserController {
    async login(req: Request, res: Response){
        const service = new authService();

        const loginSchema = z.object({
            email: z.string().min(1).max(50),
            password: z.string().min(1).max(15)
        })

        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const {email, password} = parsed.data;

        const [data, error] = await service.exeLogin(email, password);

        if (error) {
            return res.status(400).json({ error: error.message});
        }
        return res.json(data);
    }
}