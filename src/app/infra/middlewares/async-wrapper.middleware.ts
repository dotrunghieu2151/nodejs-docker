import { Handler, NextFunction, Request, Response } from 'express';

export function asyncWrapper(
  fn: (req: Request, res: Response) => Promise<any> | any,
  callNext = false,
): any {
  return (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn(req, res);

      if (callNext) {
        return next();
      }

      res.send({ data });
    } catch (err) {
      // log.error(err);
      next(err);
    }
  }) as any as Handler;
}
