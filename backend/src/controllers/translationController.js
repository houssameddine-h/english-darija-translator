import { translateText } from '../services/translationService.js';
import { dataResponse } from '../utils/utils.js';

export async function translate(req, res) {
    const userText = req.body.text;

    const data = await translateText(userText);

    if (data.error) {
        res.status(data.error.code).send(data);
    } else {
        res.send(dataResponse(data));
    }
}