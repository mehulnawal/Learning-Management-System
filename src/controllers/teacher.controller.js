import { TeacherAssignment } from "../models/teacherAssignment.model.js";
import { User } from "../models/user.model.js";

export const getMyAssignments = async (req, res) => {
    const assignments = await TeacherAssignment.find({ teacher: req.user.id })
        .populate("standard")
        .populate("subject");

    res.json(assignments);
};

export const getStudentsByStandard = async (req, res) => {
    const { standardId } = req.params;

    const students = await User.find({
        role: "student",
        standard: standardId
    }).select("-password");

    res.json(students);
};