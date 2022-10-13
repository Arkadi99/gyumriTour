import Joi from "joi";

export const ServiceCreateSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
        type: Joi.string().required(),
        description: Joi.string(),
        address: Joi.string().required(),
        images: Joi.array().items(Joi.string())
    })
})

