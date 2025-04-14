import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '../utils';
import { gemini } from './../config';

class GeminiApiService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: any;

  constructor() {
    const apiKey = gemini.apiKey;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async generateResponse(message: string): Promise<string> {
    try {
      const result = await this.model.generateContent(message);
      const response = await result.response;
      return response.text();
    } catch (error: unknown) {
      logger.error('Error in Gemini API:', error);
      throw error;
    }
  }
}

export { GeminiApiService };
