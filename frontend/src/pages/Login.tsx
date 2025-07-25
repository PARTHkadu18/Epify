/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react"
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const setUser = authContext!.setUser;


    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
        setError("");
        if(!username){
            setError("Username is required");
            return;
        }
        if (!password) {
            setError("Password is required");
            return;
        }
        try {
            const res = await axios.post('/api/users/login',{username,password});
            // console.log(res.data);
            setUser(res.data)
            navigate('/');
        } catch (error:any) {
            setError(error.response?.data?.message || error.message)
        }
        
    }
  return (
    <Box component="form" onSubmit={handleSubmit} className="w-80 mx-auto mt-20 p-6 border border-gray-300  rounded-lg flex flex-col space-y-4">
        <Typography variant="h6" className="text-center font-medium" component="h2" >
            Sign In
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}


        <TextField label="Username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} sx={{mt:2}} size="small" />

        <TextField label="Password" name="password" type={showPassword?'text':'password'} value={password} onChange={(e)=>setPassword(e.target.value)} sx={{mt:2, mb:1}} size="small" 
            slotProps={{
                input:{
                    endAdornment:(
                        <InputAdornment position="end">
                            <IconButton onClick={()=>setShowPassword((prev)=>!prev)} edge="end">
                                {showPassword? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
            />

             <Typography sx={{display: 'block',mb:2, textAlign: 'left', cursor:"pointer"}} onClick={() => navigate("/sign-up")}>
                Sign Up
            </Typography>


            <Button type="submit" variant="contained" size="medium" sx={{mt:-1}}>
                Sign In
            </Button>

    </Box>
  )
}

export default Login