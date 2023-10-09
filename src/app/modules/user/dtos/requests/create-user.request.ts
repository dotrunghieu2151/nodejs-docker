import Joi from 'joi';

export const CreateUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).required();
