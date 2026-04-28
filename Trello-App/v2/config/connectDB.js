import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbURI= process.env.MONGODB_URI

const connectDB = async()=>{
    try{
        mongoose.connection.on("connected", () => {
            console.log("DB CONNECTED 👽👽");
          });
      
          await mongoose.connect(dbURI);
    }catch(err){
        console.log(err.message)
    }
}
export default connectDB;