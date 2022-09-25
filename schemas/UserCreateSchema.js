import Joi from "joi";

export const UserCreateSchema = Joi.object({
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
        role: Joi.string(),
    })
})

export const UserLogInSchema = Joi.object({
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    })
})
