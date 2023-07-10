import {ValidationError, ValidationChain} from 'express-validator'
import { CustomError } from './custom-err';

export class RequestValidationError extends CustomError{

    statusCode: number = 400;
    
    constructor(public errors: ValidationError[]){
        super("invalid request parameters");
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    formatedErrors(): { message: string; typr?: string | undefined; }[] {
        
        return this.errors.map(err => {
            return {
                message: err?.msg || "something went wrong",
                type: err?.type || "unkonwn"
            }
        })
    }
}

