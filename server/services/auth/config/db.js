// Database Config codebase for MongoDB

import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns"; // This is for those who encounters DNS error connecting to mongoDB
dotenv.config();

export async function connectMongoDB() {
    try {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
        await mongoose.connect(process.env.MONGODB_CONNECTION_STR);
        console.log("Successfully connected to MongoDB ✅");

    } catch (error) {
        console.log("Error: ❌", error);

    }
}