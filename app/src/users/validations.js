const Joi = require('joi');


const validateLoginSchema = (user) => {
    const loginSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return new Promise((resolve, reject) => {
        Joi.validate(user, loginSchema, (err, value) => {
            resolve(err);
        });
    });
}

const validateUserRegisterSchema = (user) => {
    const registerSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
    });
    return new Promise((resolve, reject) => {
        Joi.validate(user, registerSchema, (err, value) => {
            resolve(err);
        });
    });
}

const validateUserUpdateSchema = (user) => {
    const updateSchema = Joi.object().keys({
        name: Joi.string().required(),
    });
    return new Promise((resolve, reject) => {
        Joi.validate(user, updateSchema, (err, value) => {
            resolve(err);
        });
    });
}

module.exports.validateLoginSchema = validateLoginSchema;
module.exports.validateUserRegisterSchema = validateUserRegisterSchema;
module.exports.validateUserUpdateSchema = validateUserUpdateSchema;