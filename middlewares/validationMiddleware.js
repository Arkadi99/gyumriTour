import HttpError from "http-errors";

const validationMiddleware = (schema) => (req, res, next) => {
    try{
        const valid = schema.unknown().validate(req);
        if (valid.error){
            throw HttpError(422, {errors: valid.error.details});
        }
        next();
    } catch (e) {
        next(e);
    }
}
export default validationMiddleware;
