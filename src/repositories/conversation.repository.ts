import { Conversation, ConversationDocument } from '../interfaces';
import { ConversationModel } from '../models';

class ConversationRepository {
  private readonly model = ConversationModel;

  async createConversation(conversation: Conversation): Promise<ConversationDocument> {
    const newConversation = new this.model(conversation);
    return await newConversation.save();
  }

  async getConversationByConversationId(conversationId: string): Promise<ConversationDocument | null> {
    return await this.model.findOne({ conversation_id: conversationId });
  }

  async getConversationsByConversationId(conversationId: string): Promise<ConversationDocument[] | null> {
    return await this.model.find({ conversation_id: conversationId });
  }
}

export const conversationRepo = new ConversationRepository();
