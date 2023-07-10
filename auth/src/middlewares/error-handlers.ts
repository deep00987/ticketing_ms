import { Request , Response, NextFunction } from "express";
import { CustomError } from "../error-types/custom-err";

export const errHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {

    if (err instanceof CustomError){
        return res.status(err.statusCode).send(
            {errors: err.formatedErrors()}
        );
    }

    return res.status(400).send({
        errors: [
            {
                message: "something went wrong!",
                field: "unknown"
            }
        ]
    })
}
