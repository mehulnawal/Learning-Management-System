import { Subject } from "../models/subject.model.js";
import { User } from "../models/user.model.js";

export const getMySubjects = async (req, res) => {
    const student = await User.findById(req.user.id);

    const subjects = await Subject.find({
        standard: student.standard
    });

    res.json(subjects);
};