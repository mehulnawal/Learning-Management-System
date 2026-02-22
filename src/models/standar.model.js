import mongoose from "mongoose";

const standardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

export const Standard = mongoose.model("Standard", standardSchema);