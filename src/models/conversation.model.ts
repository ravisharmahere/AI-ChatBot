import { model, Schema } from 'mongoose';
import { ConversationDocument } from '../interfaces';
import { COLLECTION_NAME } from '../constants';

const schema = new Schema<ConversationDocument>(
  {
    conversation_id: { type: String, required: true },
    message: { type: String, required: true },
    reply: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const ConversationModel = model<ConversationDocument>(COLLECTION_NAME.CONVERSATION, schema);
