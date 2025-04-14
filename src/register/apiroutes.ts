import { Router, Request, Response, NextFunction } from 'express';
import { nodeEnv } from '../config';
import { NotFoundError, NotFoundResponse } from '../core';
import { ConversationRoutes } from '../routes';

export const RegisterApiRoutes = (router: Router, prefix: string): void => {
  router.get('/', (req: Request, res: Response) => {
    res.send(`WELCOME TO AI CHATBOT ${nodeEnv.toUpperCase()} ❤`);
  });

  router.get(prefix, (req: Request, res: Response) => {
    res.send(`WELCOME TO AI CHATBOT ${nodeEnv.toUpperCase()} API ❤`);
  });

  router.use(`${prefix}/conversation`, new ConversationRoutes().router);

  router.use((req: Request, res: Response, next: NextFunction) => new NotFoundResponse().send(res));
};
