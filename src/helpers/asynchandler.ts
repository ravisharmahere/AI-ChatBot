import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export const asyncHandler =
  (execution: AsyncFunction): ((req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction): Promise<unknown> =>
    Promise.resolve(execution(req, res, next)).catch(error => next(error));
