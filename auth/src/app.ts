import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import 'express-async-errors';
import { userRouter } from "./routes/auth-routes";
import {errHandler} from "@lambda_2000/common";
import { NotFoundErr } from "@lambda_2000/common";


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== `test` ? true : false,
  // httpOnly: true
}))

app.use('/api/users', userRouter);
// at last
// TODO: have to handle erros on async request [done]
app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundErr();
})

app.use(errHandler);

export { app }


