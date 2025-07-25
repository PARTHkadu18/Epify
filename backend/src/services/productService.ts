import productModel from "../models/productModel";
import { IProduct } from "../models/productModel";

interface GetProductsOptions {
  page?: number;
  limit?: number;
}

class ProductService{

    async addProduct(data: {name:string, type:string, sku:string, image_url:string, description:string, quantity:string, price:string}){
        
        const product = await productModel.create(data);
        return product._id;
    }

    async updateProQuantity(id:string, quantity:string){
        const product = await productModel.findById(id);
        if(!product){
            throw new Error("Product not found");
        }
        product.quantity = quantity;
        await product.save();
        return product;
    }

    async getProducts(options: GetProductsOptions){
        const page = options.page && options.page>0 ? options.page:1;
        const limit = options.limit && options.limit > 0 ? options.limit : 10;
        const skip = (page-1)*limit;

        const query: Record<string, any> = {};
        const [items, total] = await Promise.all([
            productModel.find(query).skip(skip).limit(limit).exec(),
            productModel.countDocuments(query).exec(),
        ]);
        return {
            items,
            pagination:{total,page,limit,pages: Math.ceil(total / limit)}
        }
    }
}

export default ProductService