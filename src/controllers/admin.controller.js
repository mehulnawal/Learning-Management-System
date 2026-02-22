import { User } from "../models/user.model.js";
import { Standard } from "../models/standard.model.js";
import { Subject } from "../models/subject.model.js";
import { TeacherAssignment } from "../models/teacherAssignment.model.js";

export const createTeacher = async (req, res) => {
    const { email, password, name } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Teacher exists" });

    const teacher = await User.create({
        email,
        password,
        name,
        role: "teacher"
    });

    res.status(201).json(teacher);
};

export const createStudent = async (req, res) => {
    const { email, password, name, standard } = req.body;

    const student = await User.create({
        email,
        password,
        name,
        role: "student",
        standard
    });

    res.status(201).json(student);
};

export const getAllTeachers = async (req, res) => {
    const teachers = await User.find({ role: "teacher" }).select("-password");
    res.json(teachers);
};

export const getAllStudents = async (req, res) => {
    const students = await User.find({ role: "student" })
        .populate("standard")
        .select("-password");
    res.json(students);
};

export const createStandard = async (req, res) => {
    const { name } = req.body;
    const standard = await Standard.create({ name });
    res.status(201).json(standard);
};

export const createSubject = async (req, res) => {
    const { name, standard } = req.body;
    const subject = await Subject.create({ name, standard });
    res.status(201).json(subject);
};

export const assignTeacher = async (req, res) => {
    const { teacher, standard, subject } = req.body;

    const assignment = await TeacherAssignment.create({
        teacher,
        standard,
        subject
    });

    res.status(201).json(assignment);
};