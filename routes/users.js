import express from "express";
import UserController from "../controllers/UserController";
import checkAuth from "../middlewares/checkAuth";
import validationMiddleware from "../middlewares/validationMiddleware";
import {UserCreateSchema, UserLogInSchema, UserUpdateSchema} from "../schemas/UserCreateSchema";

const router = express.Router();

router.post('/register',validationMiddleware(UserCreateSchema), UserController.register);
router.get('/confirmEmail',UserController.confirmEmail);
router.post('/auth/login',validationMiddleware(UserLogInSchema), UserController.login)
router.get('/profile', checkAuth, UserController.getProfile)
router.get('/googleLogin', UserController.googleLogin)
router.get('/passwordEmail', UserController.passwordEmail)
router.get('/passwordChangeCode', UserController.passwordChangeCode)
router.post('/auth/login',validationMiddleware(UserLogInSchema), UserController.login);
router.get('/profile', checkAuth, UserController.getProfile);
router.put('/profile', checkAuth,validationMiddleware(UserUpdateSchema), UserController.updateProfile);
router.get('/googleLogin', UserController.googleLogin);


export default router;
