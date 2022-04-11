import { Request, Response, NextFunction } from 'express';

export class ExpressAdapter {
  public static perform(fn: any) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<Response<any> | void> => {
      try {
        return res.status(200).json(await fn({ ...req.body, ...req.params }));
      } catch (error: any) {
        next(error);
      }
    };
  }

  static performMiddleware(fn: any) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<Response<any> | void> => {
      try {
        await fn({ ...req.body, ...req.params });
        next();
      } catch (error: any) {
        next(error);
      }
    };
  }
}
