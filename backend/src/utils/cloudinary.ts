import {v2 as cloudinary} from "cloudinary"
import fs from "fs";

const connectCloudinary = async()=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
}
const uploadOnCloudinary = async(localFilePath: string)=>{
    try {
        if(!localFilePath)return null
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // console.log("File uploaded on cloudinary: ", response);
        fs.unlinkSync(localFilePath) 
        return response;
    } catch (error) {
        console.log(error);
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as uploading fails
    }   
}

export { uploadOnCloudinary }

export default connectCloudinary