import {
  Router as ExpressRouter,
  NextFunction,
  Request,
  Response,
} from 'express';
import createHttpError from 'http-errors';

import { AppRouter } from './infra/router/router';
import { UserRouter } from './modules/user/router';

export const ServerRouter = (): ExpressRouter => {
  const router = AppRouter();
  router.use('/users', UserRouter());

  router.use('*', (req: Request, res: Response, next: NextFunction) => {
    throw createHttpError(404, 'not found');
  });
  return router;
};
