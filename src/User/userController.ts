import { Request, Response } from 'express';
import { authService } from './userService';

export class UserController {
    private service = new authService();

    async login(req: Request, res: Response){
        const { email, password } = req.body;
        const service = new authService();
        try{
            const result = await service.exeLogin(email, password);

            return res.json(result);
        } catch ( error) {
            return res.status(401).json({ error: (error as Error).message });
        }
    }
}