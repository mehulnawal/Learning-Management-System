import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },

        name: {
            type: String,
            lowercase: true,
        },

        role: {
            type: String,
            enum: {
                values: ["admin", "student", "teacher"],
                message: `{VALUE} is not allowed. Only Admin, Student, Teacher`,
            },
            required: [true, "Role is required"],
        },

        subject: {
            type: String,
            lowercase: true,
            default: null,
        },
    },
    { timestamps: true }
);

// Hash password
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();

        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME }
    );
};

// Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME }
    );
};

export const User = mongoose.model("User", userSchema);