import Joi from "joi";

// *registration validation

export const registerUserValidationSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .trim()
        .min(5)
        .max(55)
        .lowercase(),
    // must be at least 8 characters with atleast one uppercase, one lowecase and one special charachter and a number
    password: Joi.string()
        .required()
        .trim()
        .min(4)
        .max(20)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    firstName: Joi.string()
        .trim()
        .required()
        .min(2)
        .max(55),
    lastName: Joi.string()
        .trim()
        .required()
        .min(2)
        .max(55),
    gender: Joi.string()
        .required()
        .trim()
        .valid("male", "female", "preferNotToSay"),
    location: Joi.string()
        .trim()
        .required()
        .min(5)
        .max(55),
});

// *login validation

export const loginUserValidationSchema = Joi.object({
    email: Joi.string().email().trim().required().lowercase(),
    password: Joi.string().required().trim(),
});

// *update user details validation

export const updateUserValidationSchema = Joi.object({
    // must be at least 8 characters with atleast one uppercase, one lowecase and one special charachter and a number
    password: Joi.string()
        .required()
        .trim()
        .min(4)
        .max(20)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    firstName: Joi.string()
        .trim()
        .required()
        .min(2)
        .max(55),
    lastName: Joi.string()
        .trim()
        .required()
        .min(2)
        .max(55),
    gender: Joi.string()
        .required()
        .trim()
        .valid("male", "female", "preferNotToSay"),
    location: Joi.string()
        .trim()
        .required()
        .min(5)
        .max(55),
});