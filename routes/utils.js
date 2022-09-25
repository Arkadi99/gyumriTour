import express from "express";
import UtilsController from "../controllers/UtilsController";

const router = express.Router();
router.get('/weather', UtilsController.weather);



export default router;
