/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types";
import axios from "axios";

interface AuthContextType{
    user: User|null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType|null>(null);

const AuthContextProvider:React.FC<{children: ReactNode}> = ({children})=>{

    const [user, setUser] = useState<User|null>(null);

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const res= await axios.get('/api/users/me');
                console.log(res)
                setUser(res.data);
            } catch (error) {
                console.log(error);
                setUser(null);
            }
        }
        fetchUser();
    },[])


    const value: AuthContextType = {user, setUser};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        
    )
}

export default AuthContextProvider