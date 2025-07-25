import { Schema, Document, Types } from "mongoose";
import mongoose from "mongoose";

export interface IProduct extends Document {
    name:string;
    type:string;
    sku:string;
    image_url:string;
    description:string;
    quantity:string;
    price:string;
}

const productSchema:Schema<IProduct> = new Schema({
    name:{type: String, trim:true, required:true},
    type:{type: String, trim:true, required:true},
    sku:{type: String, trim:true},
    image_url:{type: String, trim:true},
    description:{type: String, trim:true},
    quantity:{type: String, trim:true, required:true},
    price:{type: String, required:true}
}, { timestamps:true })

const productModel = mongoose.model<IProduct>('product', productSchema)
export default productModel;