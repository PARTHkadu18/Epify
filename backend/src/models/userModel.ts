import { Schema, Document, Types } from "mongoose";
import mongoose from "mongoose";

export interface IUser extends Document {
  username: string;
  password?: string;


  // OAuth fields
  googleId?:string;
  provider?:'local'|'google';
  googleAccessToken?: string;
  googleRefreshToken?: string;

  _id: Types.ObjectId;
}
const userSchema:Schema<IUser> = new Schema({
    username:{ type:String, required:true, unique:true, trim:true },
    password: { type: String },

    //OAuth
    googleId:{type:String, unique:true, sparse:true},
    googleAccessToken:{type:String},
    googleRefreshToken:{type:String}

},{ timestamps:true })

const UserModel =  mongoose.model<IUser>('user',userSchema)
export default UserModel