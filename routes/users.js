import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post('/register', UserController.register);
router.get('/confirmEmail',UserController.confirmEmail);




export default router;
