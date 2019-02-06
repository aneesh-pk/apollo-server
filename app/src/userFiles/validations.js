const Joi = require('joi');


const validateUploadSchema = (user) => {
    const loginSchema = Joi.object().keys({
        name: Joi.string().required(),
        mime: Joi.string().required().regex(/^application\/pdf$/),
        blob: Joi.string().required()
    });
    return new Promise((resolve, reject) => {
        Joi.validate(user, loginSchema, (err, value) => {
            resolve(err);
        });
    });
}

module.exports.validateUploadSchema = validateUploadSchema;