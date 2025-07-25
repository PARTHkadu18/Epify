/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { AppBar, Button, IconButton, Toolbar } from "@mui/material"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    if (!authContext) return null
    const {user,setUser} = authContext;

    const handleLogout = async()=>{
        try {
            await axios.post('/api/users/logout'); 
            setUser(null);
        } catch (error:any) {
            alert(error.response?.data.message ?? error.message)            
        }
    }

  return (
    <AppBar position="static" color="primary">  

      <Toolbar sx={{display:"flex", justifyContent: "space-between" }}>
        <IconButton color="inherit" onClick={()=>navigate('/')}>
            <HomeIcon />
        </IconButton>
        {user ? (
          <Button
            color="inherit"
            onClick={handleLogout} >
                
            Logout
          </Button>
        ) : (
          <Button
            color="inherit"
            onClick={() => navigate("/sign-in")}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar