import { Router } from 'express';
import { ConversationController } from '../controllers';

export class ConversationRoutes {
  readonly router = Router();
  readonly controller = new ConversationController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post('/', this.controller.createConversation);
  }
}
