import { CustomError } from "./custom-err";

export class NotAuthoriozedError extends CustomError {
    statusCode: number = 401;
    message: string;
    constructor(msg?: string){
        super(msg || "Not authorized");
        this.message = msg || "Not authorized";
        Object.setPrototypeOf(this, NotAuthoriozedError.prototype);
    }
    formatedErrors(): { message: string; type?: string | undefined; }[] {
        return [
            {
                message: this.message
            }
        ]
    }
}