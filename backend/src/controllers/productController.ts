import ProductService from "../services/productService";
import { Request, Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary";

class ProductController{
    private productService:ProductService;

    constructor(){
        this.productService = new ProductService();
    }
    addProduct = async(req:Request, res:Response)=>{
        try {
            const { name, type, sku, description, quantity, price } = req.body;
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
                };

            const image1Array = files['image1'];
            if (!image1Array || image1Array.length === 0) {
                res.status(400).json({ message: "Product image is required." });
                return ;
            }
            const image1File = image1Array[0];
            const cloudRes = await uploadOnCloudinary(image1File.path);
            if(!cloudRes){
                res.status(500).json({ message: "Image upload failed"});
                return;
            }
            const addedProductId = await this.productService.addProduct({name,type,sku,image_url:cloudRes?.secure_url!,description,quantity,price})
            res.status(200).json({productId:addedProductId, message:"Product added successfully"});
        } catch (error) {
            res.status(401).json({message:"Failed to add product"});
        }
    }

    updateProQuantity = async(req:Request, res:Response)=>{
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const updatedRes = await this.productService.updateProQuantity(id,quantity);
            res.status(200).json({updatedProduct:updatedRes, message:"Product updated successfully"});
        } catch (error:any) {
            res.status(401).json({message:error.message});
        } 
    }

    getProducts = async(req:Request, res:Response)=>{
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const result = await this.productService.getProducts({ page, limit });
            res.status(200).json(result);
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
    }

}
export default ProductController