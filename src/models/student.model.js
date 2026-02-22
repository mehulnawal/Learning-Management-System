import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(

    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            select: false
        },

        name: {
            type: String,
            lowercase: true
        },

        role: {
            type: String,
            enum: {
                values: ["admin", "student", "teacher"],
                message: `{VALUE} is not allowed. Only Admin, Student, Teacher`
            },
            required: [true, "Name is required"],
        },
    },

    { timestamps: true }
)

userSchema.pre('save', async function () {

    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME }
    )
}

export const User = mongoose.model("User", userSchema);