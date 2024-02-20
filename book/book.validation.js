import Joi from "joi";

export const addBookValidationSchema = Joi.object({
    title: Joi.string().required().trim().min(2).max(255),
    author: Joi.string().required().trim().min(2).max(100),
    genre: Joi.string().required().trim().min(2).max(50),
    publicationYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
    condition: Joi.string().valid('New', 'Like New', 'Very Good', 'Good', 'Acceptable').required(),
    description: Joi.string().max(1000), // Assuming owner is represented by their ID
    available: Joi.boolean().default(true),
});

export const paginationDetailsValidationSchema = Joi.object({
    page: Joi.number().integer().required().min(1),
    limit: Joi.number().integer().required().min(1),
});
