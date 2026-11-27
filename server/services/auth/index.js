import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectMongoDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use('/', authRouter);

app.listen(PORT, () => {
    console.log(`Auth started: http://localhost:${PORT}/`);
    connectMongoDB();
});