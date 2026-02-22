import mongoose from "mongoose";

const teacherAssignmentSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    standard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Standard",
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    }
}, { timestamps: true });

export const TeacherAssignment = mongoose.model("TeacherAssignment", teacherAssignmentSchema);