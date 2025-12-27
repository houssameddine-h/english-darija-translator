import { createUser, getUserByEmail } from '../database/User.js';
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { status_codes, errors as _errors, PRIVATE_KEY, AUTH_TOKEN_MAX_AGE } from '../../config/config.js';

import { validateUserData, validateLoginData, errorResponse } from '../database/utils.js';

const { sign } = jwt;

export async function signup(newUser) {
    const { isValid, validUser, errors } = validateUserData(newUser, true);
    if (!isValid)
        return errorResponse(status_codes.BAD_REQUEST_SC, errors);

    // hashing password
    const salt = await genSalt();
    validUser.password = await hash(validUser.password, salt);
    // creating user in database
    try {
        const user = await createUser(validUser);
        return {
            user,
            authToken: createToken({ userId: user.user_id })
        };
    } catch (e) {
        return errorResponse(status_codes.SERVER_ERROR_SC, _errors.SERVER_ERROR);
    }
}

export async function login(email, password) {
    const { isValid, validEmail, validPwd, errors } = validateLoginData(email, password);
    if (!isValid)
        return errorResponse(status_codes.BAD_REQUEST_SC, errors);
    // getting user from Database
    try {
        const user = await getUserByEmail(validEmail);
        // checking password
        const correctPwd = await compare(validPwd, user.password);
        if (correctPwd) {
            return {
                user: {
                    user_id: user._id,
                    username: user.username,
                    email: user.email
                },
                authToken: createToken({ userId: user._id })
            };
        }
        return errorResponse(status_codes.BAD_REQUEST_SC, _errors.INCORRECT_PWD_ERROR);
    } catch (e) {
        return errorResponse(status_codes.NOT_FOUND_SC, _errors.USER_NOT_FOUND_ERROR);
    }
}

function createToken(payload) {
    return sign(payload, PRIVATE_KEY, {
        expiresIn: AUTH_TOKEN_MAX_AGE
    });
}
