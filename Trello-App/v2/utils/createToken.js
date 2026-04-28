import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const jwtSecret = process.env.JWT_SECRET || "jfldjgflgg";
const createToken = async(id)=>{
 return jwt.sign({userId:id},jwtSecret,{expiresIn:"7d"})
}
export default createToken;