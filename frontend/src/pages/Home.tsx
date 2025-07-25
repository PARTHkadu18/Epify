import { Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout";

const Home = () => {

    const navigate = useNavigate();

  return (
    <Layout>
        <Box className="w-80 mx-auto mt-20 p-6 border border-gray-300  rounded-lg flex flex-col space-y-4">
            <Typography variant="h5" className="text-center font-medium bg-blue-400 rounded-4xl cursor-pointer" sx={{mt:3, p:2}} component="h2" onClick={() => navigate("/add-product")}>
                    Add Product
            </Typography>

            <Typography variant="h5" className="text-center font-medium bg-blue-400 rounded-4xl cursor-pointer" sx={{my:3, p:2}} component="h2" onClick={() => navigate("/get-products")}>
                    Get Products
            </Typography>
        </Box>
    </Layout>
  )
}

export default Home