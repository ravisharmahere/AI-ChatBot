import { Document, ObjectId } from 'mongoose';

export interface Conversation {
  conversation_id: string;
  message: string;
  reply?: string;
}

export interface ConversationDocument extends Conversation, Document {
  id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
