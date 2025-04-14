import { Conversation, ConversationDocument } from '../interfaces';
import { conversationRepo } from '../repositories';
import { logger } from '../utils';
import { GeminiApiService } from './GeminiApi.service';

class ConversationService {
  private readonly repo = conversationRepo;

  async createConversation(conversation: Conversation): Promise<ConversationDocument> {
    try {
      const geminiService = new GeminiApiService();
      const response = await geminiService.generateResponse(conversation.message);
      conversation.reply = response;
      return await this.repo.createConversation(conversation);
    } catch (error: unknown) {
      logger.error(error);
      throw error;
    }
  }

  async getConversation(conversationId: string): Promise<ConversationDocument | null> {
    try {
      return await this.repo.getConversationByConversationId(conversationId);
    } catch (error: unknown) {
      logger.error(error);
      throw error;
    }
  }
}

export { ConversationService };
