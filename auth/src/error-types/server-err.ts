import { CustomError } from "./custom-err";

export class InternalServerError extends CustomError{
    statusCode: number = 512;
    msg: string;
    constructor(message?: string){
        super(message || "Internal server error");
        this.msg = message || "Internal server error";
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
    formatedErrors(): { message: string; type?: string | undefined; }[] {
        return [
            {
                message: this.msg,
            }
        ]
    }
}