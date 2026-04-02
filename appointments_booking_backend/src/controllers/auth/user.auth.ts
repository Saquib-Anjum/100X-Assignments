import { Request, Response } from "express";
import { prisma } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//login
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
function createJWT(id: number): string {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });
}
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide all the feild",
      });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.json({
        success: false,
        message: "User not register",
      });
      return;
    }
    const token = createJWT(user.id);
    res.json({
      success: true,
      message: "Successfully Login",
      token,
    });
  } catch (err: any) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
//register
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }
    const existingUserCheck = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUserCheck) {
      res.status(409).json({
        success: false,
        message: "User already exists",
      });
      return;
    }
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashPassword,
    };
    const user = await prisma.user.create({
      data: userData,
    });
    //sending the result
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err: any) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
//otp verification
const optVerification = async (
  req: Request,
  res: Response,
): Promise<void> => {};
//forgot password
const forgotPassword = async (req: Request, res: Response): Promise<void> => {};

export { login, register, optVerification, forgotPassword };
