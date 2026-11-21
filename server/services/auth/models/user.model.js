import mongoose from "mongoose";

// This is the user model for performing auth trhough FireBase
const userSchema = new mongoose.Schema({
    fireBaseUID: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true,
        lowercase: true
    },
    interviewCoin: {
        type: Number,
        default: 150
    }
}, { timestamps: true });

const userModel = mongoose.model("userModel", userSchema);

export default userModel;