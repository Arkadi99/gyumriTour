import express from "express";
import users from "./users";
import utils from "./utils";
import services from './service';


const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ status: 'ok' });
});

router.use('/users', users);
router.use('/utils', utils);
router.use('/services',services);


export default router;
