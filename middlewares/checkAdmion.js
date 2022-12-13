import HttpError from "http-errors";
import {Users} from "../models";

export default async (req, res, next) => {
    const { userId} = req;
    const user = await Users.findByPk(userId)

    if (user.type === 'admin' || user.type === 'company') {
        next()
    } else {
        next(HttpError(403, 'Not Allowed'));
    }
}