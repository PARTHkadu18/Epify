import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db'
import cookieParser from 'cookie-parser'
import connectCloudinary from './utils/cloudinary'

import userRoutes from './routes/userRoutes'
import productRoutes from './routes/productRoutes'

dotenv.config()
connectDB();
connectCloudinary();

const app = express()
app.use(cors({ origin: process.env.FRONTENT_URI, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());

// Routes
app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)

const PORT = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send("API working")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
