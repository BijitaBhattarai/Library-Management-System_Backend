import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/connectdb.js";
import HANDLERS from "./handlers/index.js";
import { authMiddleware } from "./middleware/auth.js";
import errorMiddleware from "./middleware/error.js";

const SERVER = express();

const PORT = process.env.PORT;

connectDB();

SERVER.use(express.json());
SERVER.use(authMiddleware);
SERVER.use("/", HANDLERS);
SERVER.use(errorMiddleware);

SERVER.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
