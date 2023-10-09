import { Container } from 'typedi';

import { IdSchema } from '@/app/infra/dtos/requests/id.request';
import { asyncWrapper } from '@/app/infra/middlewares/async-wrapper.middleware';
import { validationMiddleware } from '@/app/infra/middlewares/validation.middleware';
import { AppRouter } from '@/app/infra/router/router';

import { CreateUserSchema } from './dtos/requests/create-user.request';
import { UserController } from './user.controller';

export const UserRouter = () => {
  const router = AppRouter();

  router.get(
    '/:id',
    validationMiddleware({ params: IdSchema }),
    asyncWrapper((req) => `Got user ${req.params.id}`),
  );

  router.post(
    '/:id',
    validationMiddleware({ params: IdSchema, body: CreateUserSchema }),
    asyncWrapper((req) =>
      Container.get(UserController).createUser(req.params.id, req.body),
    ),
  );

  return router;
};
