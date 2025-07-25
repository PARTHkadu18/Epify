import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import AddProduct from "./pages/AddProduct"
import GetProducts from "./pages/GetProducts"
import { Route, Routes } from "react-router-dom"
import { useEffect } from "react"
import axios from 'axios'

const App = () => {
    useEffect(()=>{
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.defaults.withCredentials = true;
        if (apiUrl) {
            axios.defaults.baseURL = apiUrl;
        }
    },[])
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>} /> 
            <Route path="/sign-up" element={<Register/>} /> 
            <Route path="/sign-in" element={<Login/>} /> 
            <Route path="/add-product" element={<AddProduct/>} /> 
            <Route path="/get-products" element={<GetProducts/>} /> 
        </Routes>
    </div>
  )
}

export default App