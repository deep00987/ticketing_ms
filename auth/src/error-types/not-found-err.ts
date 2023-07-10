import { CustomError } from "./custom-err";

export class NotFoundErr extends CustomError {
    statusCode: number = 404;

    constructor () {
        super ("requested resource not found");
        Object.setPrototypeOf(this, NotFoundErr.prototype);

    }

    formatedErrors(): { message: string; type?: string | undefined; }[] {
        return [
            {
                message: "resource not found"
            }
        ]
    }
    
}