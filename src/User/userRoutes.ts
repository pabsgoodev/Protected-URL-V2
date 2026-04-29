import { Router } from 'express';
import { UserController } from '../User/userController';
import { authUser } from './middlewares/userAuthMiddleware';
import { limiter } from './middlewares/userLimiter';

const router = Router();
const controller = new UserController();

router.post('/login', limiter, controller.login);

router.post('/register', limiter, controller.register);

router.get('/rota-protegida', authUser, (req, res) => {
    res.json({ message: 'Acesso autorizado à rota protegida', user: (req as any).user });
    console.log('Acesso autorizado à rota protegida', (req as any).user);
});

export default router;