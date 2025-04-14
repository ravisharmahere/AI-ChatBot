// src/services/openai.service.ts
import OpenAI from 'openai';
import { openai } from '../config';
import { logger } from '../utils';

export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: openai.apiKey,
      baseURL: openai.baseUrl,
    });
  }

  async generateResponse(message: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gemini-1.5-flash',
        messages: [{ role: 'system', content: message }],
      });

      logger.info(`OpenAI response: ${completion.choices[0].message.content}`);

      return completion.choices[0].message.content || "I apologize, I couldn't generate a response.";
    } catch (error: any) {
      logger.error(error);
      throw error;
    }
  }
}

export const openAIService = new OpenAIService();
