import express from 'express';
import  dotenv from 'dotenv';
import userRouter from './routes/userRoute.js'
dotenv.config();
const app = express();
app.use(express.json())
import connectDB from './config/connectDB.js';

// db donnection
connectDB();
//api end point

app.use('/api/v1',userRouter);
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}  || http://localhost:${PORT}`) 
})