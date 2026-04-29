import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import z from "zod"


export function authUser(req: Request, res: Response, next: NextFunction) {
    const authSchema = z.object({
    authorization: z.string().startsWith("Bearer ")
    });

    const parsed = authSchema.safeParse(req.headers);
    if (!parsed.success) {
        return res.status(400).json({ message: 'Invalid authorization header' });
    }

    const token = parsed.data.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

}