import express from "express";
import UserController from "../controllers/UserController";
import validationMiddleware from "../middlewares/validationMiddleware";
import {UserCreateSchema, UserLogInSchema} from "../schemas/UserCreateSchema";

const router = express.Router();

router.post('/auth/login',validationMiddleware(UserLogInSchema), UserController.login)



export default router;
