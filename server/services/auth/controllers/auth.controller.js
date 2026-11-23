import { app } from "../config/firebase";
import { getAuth } from "firebase-admin/auth";
import userModel from "../models/user.model";
import redis from "../../../shared/redis/redis.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export const GoogleAuth = async (req, res) => {

    try {

        const { token } = req.body;
        const decoded = await getAuth(app).verifyIdToken(token);
        const user_record = await auth.get_user(decoded["uid"]);
        let status_code = 200;

        let user = await userModel.findOne({
            fireBaseUID: decoded.uid,
            email: decoded.email
        });


        if (!user) {
            user = await userModel.create({
                fireBaseUID: decoded.uid,
                email: decoded.email,
                name: user_record.display_name
            });
            status_code = 201;
        }

        const sessionID = crypto.randomUUID();

        await redis.set(`session:${sessionID}`, JSON.stringify({
            userID: user._id,
            name: user.name,
            email: user.email,
            interviewCoin: user.interviewCoin
        }), "EX", 7 * 24 * 60 * 60);

        res.cookie("session", sessionID, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURITY === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
        });

        if (status_code === 201) res.status(201).json({ message: "Account created successfully" });
        else res.status(200).json({ message: "Logged in successfully" });

    } catch (error) {
        return res.status(500).json({ message: `Server error: ${error}` });
    }

}

export const logOut = async (req, res) => {

    try {

        const sessionID = req.cookie?.session;

        await redis.del(`session:${sessionID}`);

        req.clearCookie("session", {
            httpOnly: true,
            secure: process.env.COOKIE_SECURITY === "production",
            sameSite: "lax",
        });
        
        res.status(200).json("Logged out Successfully");
    }
    catch (error) {
        return res.status(500).json({ message: `Server error: ${error}` });
    }
}