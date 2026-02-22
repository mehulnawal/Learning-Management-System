import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshToken } from "../utils/generateTokens.utils.js";

export const userLogin = async (req, res) => {
    try {

        /*
        get email, password from req.body
        validate email and password
        verify email exists or not 
        check password correct or not 
        generate tokens 
        send users data in res
        */

        const { email, password } = req.body;

        const emailRegex = /^[a-zA-z0-9-.+]+@[a-zA-z0-9]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email))
            return res.status(401).json({ message: "Invalid Email" })

        const user = await User.findOne({ email }).select("+password");

        if (!user)
            return res.status(404).json({ message: "User not found" });

        const passwordVerify = await bcrypt.compare(password, user.password);

        if (!passwordVerify)
            return res.status(400).json({ message: "Password is not correct" });

        // token generate
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }

        res.cookie("accessToken", accessToken, options);
        res.cookie("refreshToken", refreshToken, options);

        console.log(accessToken, refreshToken);

        return res.status(200).json({ message: "Login Successful", data: user });

    } catch (error) {
        return res.status(500).json({ message: "Error in login user", error: error });
    }
}

export const userRegister = async (req, res) => {

    try {

        /*
        get email, password, name from req.body
        validate email and password, name
        verify email exists or not 
        save user 
        generate tokens 
        send users data in res
        */

        const { email, password, role } = req.body;

        const user = await User.findOne({ email });

        if (user)
            return res.status(400).json({ message: "User already exists" });

        const emailRegex = /^[a-zA-z0-9-.+]+@[a-zA-z0-9]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^[\d]{6}$/;
        const allowedRoles = ["admin", "student", "teacher"];

        if (!emailRegex.test(email))
            return res.status(401).json({ message: "Invalid Email" })

        if (!passwordRegex.test(password))
            return res.status(400).json({ message: "Password should be of 6 digits" });

        if (!allowedRoles.includes(role))
            return res.status(400).json({ message: "Invalid role" });

        // saving user 
        const newUser = new User({
            email,
            password,
            role
        })
        await newUser.save();

        // token generate
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(newUser._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }

        console.log(accessToken, refreshToken);

        res.cookie("accessToken", accessToken, options);
        res.cookie("refreshToken", refreshToken, options);

        return res.status(200).json({ message: "Register Successful", data: newUser });

    } catch (error) {
        return res.status(500).json({ message: "Error in register user", error: error });
    }
}