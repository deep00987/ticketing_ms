import mongoose from 'mongoose';
import {app} from './app';

const startApp = async () => {
  if (!process.env.JWT_KEY){
    throw new Error("JWT KEY MISSING");
  }
  try{
    await mongoose.connect(`mongodb://auth-db-srv:27017/auth`);
    console.log("Connected to database");
  }catch (err) {
    console.error(err);
  }
  app.listen(4000, () => {
    console.log("Listening on port 4000");
  });
}

startApp();


