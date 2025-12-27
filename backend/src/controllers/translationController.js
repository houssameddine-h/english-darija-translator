// import { AUTH_TOKEN_MAX_AGE } from '../../configs/config.js';
// import { signup as _signup, login as _login } from '../services/authService.js';
// import { getUser } from '../services/userService.js';
import { translateText } from '../services/translationService.js';
import { dataResponse } from '../utils/utils.js';

export async function translate(req, res) {
    const userText = req.body.text;

    const data = await translateText(userText);

    if (data.error) {
        res.status(data.error.code).send(data);
    } else {
        // const { user, authToken } = data;
        // res.cookie('authToken', authToken, {
        //     maxAge: AUTH_TOKEN_MAX_AGE * 1000, // seconds -> milliseconds
        //     httpOnly: true,
        //     sameSite: 'None',
        //     secure: false,
        //     path: '/'
        // });
        res.send(dataResponse(data));
    }
}