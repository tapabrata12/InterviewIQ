import { app } from "../config/firebase";
import { getAuth } from "firebase-admin/auth";

export const GoogleAuth = async (req, res) => {

    try {

        const { token } = req.body;
        const decoded = await getAuth(app);
    } catch (error) {

    }

}