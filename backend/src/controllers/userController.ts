import UserService from "../services/userServices";
import { Request, Response } from "express";

class UserController{
    private userService: UserService

    constructor(){
        this.userService = new UserService()
    }
    register = async(req:Request, res:Response)=>{
        try {
            const {user,token} = await this.userService.registerUser(req.body);
            const cookieOptions = {
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax" as const,
                    maxAge: 50 * 60 * 1000, // e.g. 5 minutes
                };
            res.cookie("token",token, cookieOptions);
            res.status(201).json(user);
        } catch (error:any) {
            res.status(400).json({message:error.message});
        }
    }
    login = async(req:Request,res:Response)=>{
        try {
            const {user,token} = await this.userService.loginUser(req.body);
            const cookieOptions = {
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax" as const,
                    maxAge: 50 * 60 * 1000, // e.g. 5 minutes
                };
            res.cookie("token",token, cookieOptions);
            res.status(201).json(user);
        } catch (error:any) {
            res.status(400).json({message:error.message});
        }
    }
    getUser = async(req:Request, res:Response) => {
        try {
            // console.log((req as any).user);
            const userId = (req as any).user.id
            const user = await this.userService.getUserById(userId)
            // console.log(user);
            res.status(200).json(user)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
    logout = async(req:Request, res:Response)=>{
        
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "lax" as const,
            path:'/'
        };
        res.clearCookie("token", cookieOptions);
        res.status(200).json({message:"Loggout out successfully"});
    }
}

export default UserController;