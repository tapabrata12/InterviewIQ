import { app } from "../config/firebase";
import { getAuth } from "firebase-admin/auth";
import userModel from "../models/user.model";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

export const GoogleAuth = async (req, res) => {

    try {

        const { token } = req.body;
        const decoded = await getAuth(app).verifyIdToken(token);
        const user_record = await auth.get_user(decoded["uid"]);

        let user = await userModel.findOne({
            fireBaseUID: decoded.uid,
            email: decoded.email
        });

        let status_code = 200;

        if (!user) {
            user = await userModel.create({
                fireBaseUID: decoded.uid,
                email: decoded.email,
                name: user_record.display_name
            });
            status_code = 201;
        }

        const sessionID = crypto.randomUUID();

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

    }

}