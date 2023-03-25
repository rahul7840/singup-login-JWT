import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async (DB_URL) =>{
    try{
         await mongoose.connect("mongodb://localhost:27017/StreamSpaceAI",{useNewUrlParser: true});
        console.log("DB connected..")
    }catch(error){
    console.log(error)
    }
}
export default connectDB;