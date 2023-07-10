export abstract class CustomError extends Error{
    
    abstract statusCode: number;
    
    constructor(msg: string){
        super(msg);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract formatedErrors(): {
        message: string,
        type?: string
    }[]

}