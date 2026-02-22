import Router from "express";
import {
    createTeacher,
    createStudent,
    getAllTeachers,
    getAllStudents,
    createStandard,
    createSubject,
    assignTeacher
} from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/teacher/create", createTeacher);
adminRouter.get("/teacher/all", getAllTeachers);

adminRouter.post("/student/create", createStudent);
adminRouter.get("/student/all", getAllStudents);

adminRouter.post("/standard/create", createStandard);
adminRouter.post("/subject/create", createSubject);

adminRouter.post("/assign", assignTeacher);

export default adminRouter;