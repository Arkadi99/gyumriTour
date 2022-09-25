import express from "express";
import UserController from "../controllers/UserController";
import checkAuth from "../middlewares/checkAuth";
import validationMiddleware from "../middlewares/validationMiddleware";
import {UserCreateSchema, UserLogInSchema} from "../schemas/UserCreateSchema";

const router = express.Router();

router.post('/register',validationMiddleware(UserCreateSchema), UserController.register);
router.get('/confirmEmail',UserController.confirmEmail);
router.post('/auth/login',validationMiddleware(UserLogInSchema), UserController.login)
router.get('/profile', checkAuth, UserController.getProfile)


export default router;
