import { ERROR_CODES, model, PROMPT } from '../../config/config.js';
import { errorResponse } from '../utils/utils.js';

export async function translateText(englishText) {
    try {
        if (!englishText || englishText.trim() === '') {
            throw new Error('Text to translate cannot be empty');
        }

        const prompt = PROMPT(englishText);

        const result = await model.generateContent(prompt);
        const translation = result.response.text().trim();

        return {
            success: true,
            original: englishText,
            translation: translation,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Translation error:', error);
        return {
            error: errorResponse(`Translation failed: ${error.message}`, ERROR_CODES.CLIENT_ERROR)
        }
    }
}
