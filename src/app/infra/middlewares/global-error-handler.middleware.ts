import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';

import { ILogger } from '../../core/interfaces/logger.interface';
import { ValidationError } from '../exceptions/validation.error';

export const globalErrorMiddleware =
  (logger: ILogger) =>
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    if (err instanceof createHttpError.HttpError) {
      res.status(err.statusCode).send(err.message);
    } else if (err instanceof ValidationError) {
      res.status(err.statusCode).json(err.errors);
    } else {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal Server error');
    }
  };
