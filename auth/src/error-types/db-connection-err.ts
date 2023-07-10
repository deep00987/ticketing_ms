import { CustomError } from "./custom-err";

export class DatabaseConnectionError extends CustomError {
    reason: string = "Error connecting to the database"
    statusCode: number = 503;
    constructor (){
        super("Error connecting to database");
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    
    formatedErrors(): { message: string; type?: string | undefined; }[] {
        return [
            {
                message: this.reason,
                type: "DB error"
            }
        ]
    }

}