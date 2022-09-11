import {Users} from "../models";
<<<<<<< HEAD
import Helpers from "../services/randomString";
import ConfirmEmail from "../services/ConfirmEmail";
import HttpError from "http-errors";

class UserController {
    static register = async (req, res, next) => {
        try {
            const {firstName, lastName, email, password} = req.body
            const activationCode = Helpers.randomString(9)
            const user = await Users.create({
                firstName,
                lastName,
                email,
                password,
                activationCode
            })
            ConfirmEmail.confirm(email, activationCode).catch(console.trace)
            res.json({
                status: 'ok',
                user
            })
        } catch (e) {
            next(e);
        }
    }
    static confirmEmail = async (req, res, next) => {
        try {
            const {email, code} = req.query
            const user = await Users.findOne({
                where: {email, activationCode: code}
            })
            if (!user) {
                throw HttpError(404, "not found");
            }
            user.status = "active"
            await user.save()
            res.json({
                status: 'ok',
            })
        } catch (e) {
            next(e);
=======
import HttpError from "http-errors";
import jwt from 'jsonwebtoken';

class UserController {

    static login = async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({
                where: {
                    email,
                    password: Users.passHash(password)
                }
            })

            if (!user) {
                throw HttpError(403, 'Invalid email or password');
            }

            const token = jwt.sign({
                id: user.id,
                role: user.role,
                email,
            }, process.env.SECRET_KEY, {expiresIn: '24h'})

        res.json({
            user,
            token
        })

        } catch (e) {
            next(e)
>>>>>>> e57c9efec963635bde7927a954b0f4350ed84e0d
        }
    }
}

export default UserController;
