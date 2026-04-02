import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute";
dotenv.config();
//
const app = express();

//json config
app.use(express.json());
app.use("/api/user", userRouter);
const PORT: number = 3000;
app.listen(3000, () => {
  console.log(` server is running on port ${PORT} || http://localhost:${PORT}`);
});
