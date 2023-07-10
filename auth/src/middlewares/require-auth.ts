import {Request, Response, NextFunction} from 'express';
import { NotAuthoriozedError } from '../error-types/not-authorized-err';

export const requireAuth = (
    req: Request, 
    res: Response,
    next: NextFunction
) => {
   if(!req.currentUser){
        throw new NotAuthoriozedError();
   } 
   next();
}