import { rateLimit } from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: 'Muitas requisições, por favor tente novamente mais tarde.',
    standardHeaders: false,
    legacyHeaders: false,
});