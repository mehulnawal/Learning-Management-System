import Router from "express";
import {
    getMyAssignments,
    getStudentsByStandard
} from "../controllers/teacher.controller.js";

const teacherRouter = Router();

teacherRouter.get("/my-assignments", getMyAssignments);
teacherRouter.get("/students/:standardId", getStudentsByStandard);

export default teacherRouter;