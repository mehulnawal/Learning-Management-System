import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import database from "./src/database/db.js";

import userRouter from "./src/routes/user.route.js";
import adminRouter from "./src/routes/admin.route.js";
import teacherRouter from "./src/routes/teacher.route.js";
import studentRouter from "./src/routes/student.route.js";

import { userAuthentication } from "./src/utils/userAuthenticate.utils.js";
import { authorizeRoles } from "./src/utils/roleBasedAccess.utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/admin", userAuthentication, authorizeRoles("admin"), adminRouter);

app.use("/api/v1/teacher", userAuthentication, authorizeRoles("teacher"), teacherRouter);

app.use("/api/v1/student", userAuthentication, authorizeRoles("student"), studentRouter);

const port = process.env.PORT || 8000;

database().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});