import express from "express";
import UserController from "../controllers/UserController";
import validationMiddleware from "../middlewares/validationMiddleware";
import {UserCreateSchema, UserLogInSchema} from "../schemas/UserCreateSchema";

const router = express.Router();

<<<<<<< HEAD
router.post('/register', UserController.register);
router.get('/confirmEmail',UserController.confirmEmail);

=======
router.post('/auth/login',validationMiddleware(UserLogInSchema), UserController.login)
>>>>>>> e57c9efec963635bde7927a954b0f4350ed84e0d



export default router;
