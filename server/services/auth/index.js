import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({ "message": "Hello from auth service" });
});

app.listen(PORT, () => {
    console.log(`Gateway started: http://localhost:${PORT}/`);
});