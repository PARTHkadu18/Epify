import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request{
    user?:{ id: string }
}


export const protect = (req:AuthRequest, res: Response, next: NextFunction)=>{
    const token = req.cookies.token 
    if(!token){
        res.status(401).json({message: 'Not authorized. Please Login'})
        return 
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        // console.log(decoded);
        req.user = { id: decoded.id }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
        return
    }
}