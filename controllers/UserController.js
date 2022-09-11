import {Users} from "../models";
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
        }
    }
}

export default UserController;
