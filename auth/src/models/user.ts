import mongoose from "mongoose";
import { Password } from "../utils/passwd";

//describes the User attributes
interface UserAttributes{
    email: string,
    password: string
}

// describes the properties that User model has
interface UserModel extends mongoose.Model <UserDocument> {
    build(attributes: UserAttributes): UserDocument;
}

//describes the properties a user doc has
interface UserDocument extends mongoose.Document{
    email: string,
    password: string,
}


//user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
},
{
    toJSON: { // modifying JSON RESPONSE from user document
        transform(doc, ret){
            delete ret.password;
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id;
        }
    }
}
)
// TODO: ADD TRY CATCH
userSchema.pre('save', async function (next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')){
        return next();
    }
    const hashedPass = await Password.toHashString(user.get('password'));
    user.set('password', hashedPass);  
    next();
})

userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes);
}

const User = mongoose.model <UserDocument, UserModel> ("User", userSchema);

export { User }