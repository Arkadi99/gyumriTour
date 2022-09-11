import {Users} from "../models";
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
        }
    }

}

export default UserController;