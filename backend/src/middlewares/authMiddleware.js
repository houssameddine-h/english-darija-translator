import jwt from 'jsonwebtoken';
import { PRIVATE_KEY, status_codes } from '../../config/config.js';

const { verify } = jwt;

export function requireAuth(req, res, next) {
    const authToken = req.cookies.authToken;
    if (authToken) {
        try {
            const decodedToken = verify(authToken, PRIVATE_KEY);
            console.log(decodedToken);
            req.params.userId = decodedToken.userId;
            next();
        } catch (error) {
            console.error(error);
            res.send({
                error: { status: 'KO', code: status_codes.UNAUTHORIZED_SC }
            });
        }
    } else {
        res.send({
            error: { status: 'KO', code: status_codes.UNAUTHORIZED_SC }
        });
    }
}