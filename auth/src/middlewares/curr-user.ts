import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { InternalServerError } from '../error-types/server-err';
import { NotAuthoriozedError } from '../error-types/not-authorized-err';

interface UserPayload{
    id: string,
    email: string
}

declare global{
    namespace Express{
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (!req.session || !req.session.jwt){
        return next();
    }
    try {
        const payload = jwt.verify(
            req.session?.jwt, 
            process.env.JWT_KEY!
        ) as UserPayload;
        req.currentUser = payload;
    } catch (error) {
        // throw new NotAuthoriozedError();
    }
    
    next();
}