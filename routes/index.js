import express from "express";
import users from "./users";
import utils from "./utils";


const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ status: 'ok' });
});

router.use('/users', users);
router.use('/utils', utils);


export default router;
