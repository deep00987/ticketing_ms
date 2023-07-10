import express from 'express';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@lambda_2000/common';
import { User } from '../models/user';
import { BadRequestError } from '@lambda_2000/common';
import { Password } from '../utils/passwd';
import { currentUser } from '@lambda_2000/common';

const router = express.Router()

router.get('/current_user',
    currentUser,
    // requireAuth,
    async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).send({
            currentUser: req.currentUser || null
        })
    }   
);

router.post('/signin',
    [
        body('email').isEmail().withMessage("email format is invalid"),
        body('password').trim().isLength({min: 4, max: 20}).withMessage("password must be bwtween 4-20 chars long")
    ], 
    validateRequest, 
    async (req: Request, res: Response, next: NextFunction) => {    
        const { email, password } = req.body;
        const userExists = await User.findOne({email})

        if (!userExists){
            throw new BadRequestError("Login credentials invalid")
        }

        const originalPassHash = userExists?.password || " ";
        const hashCheck = await Password.compare(originalPassHash, password);

        if (!hashCheck){
            throw new BadRequestError("Login credentials invalid");
        }

        const token = jwt.sign({
            id: userExists.id, 
            email: userExists.email
        }, process.env.JWT_KEY! ); 

        req.session = {
            jwt: token
        }

        res.status(200).json({ 
            "data": { user: userExists }
        })
        
    }
);

router.post('/signout', 
    async (req: Request, res: Response, next: NextFunction) => {
        req.session = null;
        res.status(200).send({})
    }
);

router.post('/register', 
    [
        body('email').isEmail().withMessage("email format is invalid"),
        body('password').trim().isLength({min: 4, max: 20}).withMessage("password must be bwtween 4-20 chars long")
    ], 
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {

        const { email, password } = req.body;
        const userExists = await User.findOne({email})

        if (userExists) {
            throw new BadRequestError("Email is already in use");
        }
    
        const user = User.build({email, password});
        await user.save();

        const token = jwt.sign({
            id: user.id, 
            email: user.email
        }, process.env.JWT_KEY! ); 

        req.session = {
            jwt: token
        }

        res.status(201).json({ 
            "data": { user }
        })
});

export {router as userRouter}