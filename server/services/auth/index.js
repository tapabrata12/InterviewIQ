import express from "express";
import dotenv from "dotenv";
import { connectMongoDB } from "./config/db.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({ "message": "Hello from auth service" });
});

app.listen(PORT, () => {
    console.log(`Auth started: http://localhost:${PORT}/`);
    connectMongoDB();
});