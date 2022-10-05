import express from "express";
import ServiceController from "../controllers/ServiceController";
import checkAuth from "../middlewares/checkAuth";
import multer from "multer";
import {v4 as uuIdV4} from 'uuid';
import os from 'os';
import  HttpError  from "http-errors";

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, os.tmpdir())
        },
        filename: (req, file, cb) => {
            if(!['image/jpeg', 'image/pnj', 'image/gif'].includes(file.mimetype)){
                cb(HttpError(422, 'Invalid file type'));
                return;
            }
            cb(null, `${uuIdV4()}_${file.originalname}` );
        }
    })
})

router.post('/create', checkAuth, upload.array('images'), ServiceController.createService);

export default router;