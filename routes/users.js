import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.get('/', UserController.test)
router.post('/auth/login', )
router.post('/auth/signup', )



export default router;
