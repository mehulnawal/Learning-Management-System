import Router from "express";
import { getMySubjects } from "../controllers/student.controller.js";

const studentRouter = Router();

studentRouter.get("/subjects", getMySubjects);

export default studentRouter;