import { GoogleGenerativeAI } from '@google/generative-ai';
import { PROMPT } from './config/config.js';

export default class Translator {

  constructor() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = genAI.getGenerativeModel({ model: process.env.MODEL });
  }

  async translate(englishText) {
    try {
      if (!englishText || englishText.trim() === '') {
        throw new Error('Text to translate cannot be empty');
      }

      const prompt = PROMPT(englishText);

      const result = await this.model.generateContent(prompt);
      const translation = result.response.text().trim();

      return {
        success: true,
        original: englishText,
        translation: translation,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error(`Translation failed: ${error.message}`);
    }
  }
}
