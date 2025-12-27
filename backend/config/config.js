import { GoogleGenerativeAI } from "@google/generative-ai";

export const API_VERSION = 1;

export const PROMPT = input => `Translate the following English text to Moroccan Arabic Dialect (Darija). Provide the translation in latin letters, and not in arabic letters. Provide only the Darija translation without any explanations or additional text.

    English text: "${input}"

    Darija translation:`;

export const model =
    new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    .getGenerativeModel({ model: process.env.MODEL });

export const ERROR_CODES = {
    CLIENT_ERROR: 401,
    SERVER_ERROR: 501
}


export const MIN_PWD_LENGTH = 6;
export const USERNAME_REGEXP = /.{3,28}/;
export const EMAIL_REGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const errors = {
    USER_NOT_FOUND_ERROR: 'User Not Found',
    INCORRECT_PWD_ERROR: 'Incorrect Password',
    SERVER_ERROR: 'Internal Server Error',
    INVALID_USER_DATA_ERROR: 'Invalid User Data'
};
export const status_codes = {
    BAD_REQUEST_SC: 400,
    UNAUTHORIZED_SC: 401,
    NOT_FOUND_SC: 404,
    SERVER_ERROR_SC: 500,
};
export const PRIVATE_KEY = 'TOP MEGA SECRET STRING!';
export const AUTH_TOKEN_MAX_AGE = 60 * 60 * 24 * 15;