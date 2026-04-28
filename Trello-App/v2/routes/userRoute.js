import express from 'express';
const userRouter = express.Router();
import {login, signup} from '../controllers/userController.js'
//signup
userRouter.post('/signup',signup);
// login
userRouter.post('/login',login);

export default  userRouter;