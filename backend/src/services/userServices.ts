import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {

    async registerUser(data: {username:string, password: string}){
        const {username, password} = data;

        const existing  = await UserModel.findOne({username})
        if(existing){
            throw new Error('User already exists')
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await UserModel.create({
            username,
            password:hashedPassword
        })
        const token = this.generateToken(user._id.toString());
        return {user:{_id: user._id, username: user.username},token};
    }

    async loginUser(data: {username:string, password: string}){
        const {username, password} = data;
        const existingUser  = await UserModel.findOne({username})
        if(!existingUser){
            throw new Error('User not found')
        }
        const isMatch = await bcrypt.compare(password, existingUser.password!);
        if(!isMatch){
            throw new Error('Incorrect Password');
        }
        const token = this.generateToken(existingUser._id.toString());
        return {user:{_id: existingUser._id, username: existingUser.username},token};
    }
    async getUserById(id:string){
        const user = await UserModel.findById(id).select('-password')
        if(!user){
            throw new Error('User not found')
        }
        return user
    }
    private generateToken(id:string){
        return jwt.sign({id}, process.env.JWT_SECRET!, { expiresIn: '7d' })
    }
}
export default UserService