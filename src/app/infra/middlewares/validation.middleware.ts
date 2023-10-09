import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { Container } from 'typedi';

import { ValidationError } from '../exceptions/validation.error';
import { WinstonLogger } from '../logger/winston-logger';

export const validationMiddleware =
  (
    schema: { params?: Joi.Schema; body?: Joi.Schema; query?: Joi.Schema },
    options: Joi.ValidationOptions = { stripUnknown: true },
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get(WinstonLogger);
    try {
      const mainSchema = Joi.object({
        params: Joi.object().optional(),
        body: Joi.any().optional(),
        query: Joi.object().optional(),
      }).required();
      const result = mainSchema
        .keys(schema)
        .validate(
          { query: req.query, params: req.params, body: req.body },
          options,
        );
      if (result?.error) {
        if (result.error.details?.length) {
          logger.info(
            'Request data is invalid. Reason : ' +
              result.error.details[0]?.message,
          );
          return next(
            new ValidationError('Validation errors', result.error.details),
          );
        }
        logger.info(
          `Request data is invalid. Reason : ${JSON.stringify(result.error)}`,
        );
        return next(new ValidationError('Invalid input data', result.error));
      }
    } catch (err: unknown) {
      logger.error(JSON.stringify(err));
      next(err);
    }

    next();
  };
