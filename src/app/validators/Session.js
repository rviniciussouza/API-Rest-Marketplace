const Joi = require("joi");

module.exports = {
	body: {
		email: Joi.string()
			.email()
			.required(),
		passsword: Joi.string().required()
	}
};
