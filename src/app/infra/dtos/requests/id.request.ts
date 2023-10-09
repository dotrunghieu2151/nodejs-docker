import Joi from 'joi';

export const IdSchema = Joi.object({
  id: Joi.number().required(),
});
