import express from "express";
import {
  login,
  register,
  optVerification,
  forgotPassword,
} from "../controllers/auth/user.auth";
const userRouter = express.Router();
userRouter.post("/login", login);
userRouter.post("/register", register);
export default userRouter;
