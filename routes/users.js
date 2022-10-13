import express from "express";
import UserController from "../controllers/UserController";
import checkAuth from "../middlewares/checkAuth";
import validationMiddleware from "../middlewares/validationMiddleware";
import {UserCreateSchema, UserLogInSchema, UserUpdateSchema} from "../schemas/UserCreateSchema";
import multer from "multer";
const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, os.tmpdir())
        },
        filename: (req, file, cb) => {
            if(!['image/jpeg', 'image/png'].includes(file.mimetype)){
                cb(HttpError(422, 'Invalid file type'));
                return;
            }
            cb(null, `${uuIdV4()}_${file.originalname}` );
        }
    })
})

router.post('/register',validationMiddleware(UserCreateSchema), UserController.register);
router.get('/confirmEmail',UserController.confirmEmail);
router.post('/auth/login',validationMiddleware(UserLogInSchema), UserController.login)
router.get('/profile', checkAuth, UserController.getProfile)
router.get('/googleLogin', UserController.googleLogin)
router.get('/passwordEmail', UserController.passwordEmail)
router.get('/passwordChangeCode', UserController.passwordChangeCode)
router.post('/auth/login',validationMiddleware(UserLogInSchema), UserController.login);
router.get('/profile', checkAuth, UserController.getProfile);
router.put('/profile', checkAuth,validationMiddleware(UserUpdateSchema),upload.single('avatar'), UserController.updateProfile);
router.get('/googleLogin', UserController.googleLogin);


export default router;
