
import userModel from '../models/userModel.js'
import createToken from '../utils/createToken.js';
import bcrypt from 'bcrypt'
//signup
const signup =async( req , res)=>{
    try{
      const { name, email, password } = req.body;
    const userExist =await  userModel.findOne({email});
    if (userExist) {
      res.status(400).json({
        success: false,
        messgae: "User already exists",
        userExist
      });
      return;
    }
    
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
   
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword
    });
   
    
    return res.json({
      success: true,
      message: "You are SuccessFully Registred",
      
    });

    }catch(err){
     res.json({
      success:false,
      message:err.message
     })
    }
}
//login
const login = async (req , res)=>{
try{
const {email, password} = req.body;
const user = await userModel.findOne({email});
if(!user){
  res.json({
    success:false, 
    message:"User Not Found"
  })
}
const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch){
  return res.json({
    success:false,
    message:"Invalid Credintails"
  })
}
const token = await createToken(user._id);
res.json({
  success:true,
  message:"successfully logged in",
  token
})

}catch(err){
  res.json({
    success:false,
    message:err.message
   })
  }

}
export {signup, login}