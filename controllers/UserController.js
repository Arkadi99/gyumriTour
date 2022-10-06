import {Users} from "../models";

import Helpers from "../services/Helpers";
import ConfirmEmail from "../services/ConfirmEmail";
import HttpError from "http-errors";
import jwt from 'jsonwebtoken';

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
                activationCode,
                avatar:"http://localhost:5050/images/users.png"
            });

            ConfirmEmail.confirm(email, activationCode).catch(console.trace);

            const token = jwt.sign({
                id: user.id,
                role: user.role,
                email,
            }, process.env.SECRET_KEY)

            res.json({
                user,
                token
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

            if(user.status === 'pending') {
                throw HttpError(401, 'Your email is not confirmed')
            }

            const token = jwt.sign({
                id: user.id,
                role: user.role,
                email,
            }, process.env.SECRET_KEY)

            res.json({
                user,
                token
            })

        } catch (e) {
            next(e)
        }
    }

    static getProfile = async(req, res, next) => {
        try{
            const {userId} = req

            const user = await Users.findOne({
                where: {
                    id : userId
                }
            })

            if (!user){
                next(HttpError(403, 'Not allowed'))
            }

            res.json({
               user
            })
        } catch(e) {
            next(e)
        }
    }


    static updateProfile = async(req, res, next) => {
        try {
            const {userId} = req;
            const {firstName, lastName, email} = req.body;

            const user = await Users.findOne({
                where:{
                    id: userId
                }
            })
            
            user.set({
                firstName,
                lastName,
                email
            });

            user.save();

            res.json({
                user
            })
        } catch (e) {
            next(e)
        }
    }


    static googleLogin = async (req, res, next) => {
        try {
            const {googleToken} = req.query
            const {data} = await Helpers.googleLogin(googleToken);
            const {given_name,family_name,email,email_verified,sub, picture} = data
            if (!googleToken) {
                throw HttpError(404, "not google users");
            }
            if (!email_verified) {
                throw HttpError(404, "not google verification");
            }
            const user = await Users.create({
                firstName:given_name,
                lastName:family_name,
                email,
                password:sub,
                status:"active",
                avatar:picture
            });
            const token = jwt.sign({
                id: user.id,
                role: user.role,
                email,
            }, process.env.SECRET_KEY, {expiresIn: '24h'})
            res.json({
                status: 'ok',
                user,
                token
            })
        } catch (e) {
            next(e);
        }
    }
    static passwordEmail = async(req, res, next) => {
        try{
            const {email} = req.query
            const user = await Users.findOne({
                where: {
                    email
                }
            })
            if (!user){
                next(HttpError(403, 'Not allowed'))
            }
            const code = user.getDataValue("activationCode")
            ConfirmEmail.confirmChange(email, code).catch(console.trace);
            res.json({
                status: 'ok',
                message:"Go your Email"
            })
        } catch(e) {
            next(e)
        }
    }
    static passwordChangeCode = async(req, res, next) => {
        try{
            const {code,password} = req.query
            const user = await Users.findOne({
                where: {
                    activationCode:code
                }
            })
            if (!user){
                next(HttpError(403, 'Not allowed'))
            }
            user.password = password
            await user.save()
            res.json({
                status: 'ok',
            })
        } catch(e) {
            next(e)
        }
    }
}

export default UserController
