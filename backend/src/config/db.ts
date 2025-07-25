import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/epify`)
        console.log('DB Connected');
        
    } catch (error) {
        console.log("MONGO_DB connection error: ",error);
    }
}
export default connectDB