import HttpError from "http-errors";
import {allow} from "joi";

const validationMiddleware = (schema) => (req, res, next) => {
    try {
        const valid = schema.unknown().validate(req);
        if (valid.error) {
            const path = valid.error.details[0].path[1]
            const err = valid.error.details[0].message.replace(/^"(\w*?\.)(\w*)"/, path)
            throw HttpError(422, {errors: err, path});
            // throw HttpError(422, {errors: valid.error.details});
        }
        next();
    } catch (e) {
        next(e);
    }
}
export default validationMiddleware;
