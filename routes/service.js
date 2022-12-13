import express from "express";
import ServiceController from "../controllers/ServiceController";
import checkAuth from "../middlewares/checkAuth";
import multer from "multer";
import {v4 as uuIdV4, validate} from 'uuid';
import os from 'os';
import  HttpError  from "http-errors";
import validationMiddleware from "../middlewares/validationMiddleware";
import {ServiceCreateSchema} from "../schemas/ServiceCreateSchema";
import checkAdmion from "../middlewares/checkAdmion";

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, os.tmpdir())
        },
        filename: (req, file, cb) => {
            if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)){
                cb(HttpError(422, 'Invalid file type'));
                return;
            }
            cb(null, `${uuIdV4()}_${file.originalname}` );
        }
    })
})

router.post('/create', checkAuth, upload.array('images'),validationMiddleware(ServiceCreateSchema), ServiceController.createService);
router.get('/:id', ServiceController.getOneService);
router.get('/', ServiceController.getAllServices);
router.delete('/:id', checkAuth, checkAdmion, ServiceController.deleteService);
router.put('/:id', checkAuth, upload.array('images'), validationMiddleware(ServiceCreateSchema), ServiceController.updateService);
router.post('/:id', checkAuth, ServiceController.addComment);

export default router;