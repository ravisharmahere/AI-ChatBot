import { Request, Response } from 'express';
import { asyncHandler } from '../helpers';
import { logger } from '../utils';
import { SuccessResponse } from '../core';
import { ConversationService } from '../services';
import { BadRequestError } from '../core/apierror';
import { v4 as uuidv4 } from 'uuid';
import { FailureMsgResponse } from '../core/apiresponse';

export class ConversationController {
  createConversation = asyncHandler(async (req: Request, res: Response) => {
    try {
      let { conversation_id, message } = req.body;
      if (!message) {
        throw new BadRequestError('Message is required');
      }

      const conversationService = new ConversationService();
      const prevConversation = await conversationService.getConversation(conversation_id);

      if (!prevConversation) {
        conversation_id = uuidv4();
      }

      const data = await conversationService.createConversation({
        conversation_id,
        message,
      });
      return new SuccessResponse('Success', {
        conversation_id: data.conversation_id,
        message: data.message,
        reply: data.reply,
        updated_at: data.updatedAt,
      }).send(res);
    } catch (error: any) {
      logger.error(error);
      return new FailureMsgResponse(error.message).send(res);
    }
  });
}
