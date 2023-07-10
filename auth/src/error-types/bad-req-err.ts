import { CustomError } from "./custom-err";

export class BadRequestError extends CustomError{
    statusCode: number = 400;
    msg: string;
    constructor(msg: string | "bad request"){
        super(msg);
        this.msg = msg;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    formatedErrors(): { message: string; type?: string | undefined; }[] {
        return[
            {
                message: this.msg,
            }
        ]
    }

}