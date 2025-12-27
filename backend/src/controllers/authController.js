import { AUTH_TOKEN_MAX_AGE } from '../../config/config.js';
import { signup as signupService, login as loginService } from '../services/authService.js';
import { getUser } from '../services/userService.js';
import { dataResponse } from '../utils/utils.js';

export async function signup(req, res) {
    const newUser = {
        username: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const data = await signupService(newUser);
    if (data.error)
        res.status(data.error.code).send(data);
    else {
        const { user, authToken } = data;
        res.cookie('authToken', authToken, {
            maxAge: AUTH_TOKEN_MAX_AGE * 1000, // seconds -> milliseconds
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            path: '/'
        });
        res.send(dataResponse(user));
    }
}

export async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const data = await loginService(email, password);
    if (data.error)
        res.status(data.error.code).send(data);
    else {
        const { user, authToken } = data;
        res.cookie('authToken', authToken, {
            maxAge: AUTH_TOKEN_MAX_AGE * 1000,
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            path: '/'
        });
        res.send(dataResponse(user));
    }
}

export async function logout(req, res) {
    // can't delete an httpOnly cookie on the client side, so we're doing it here
    res.cookie('authToken', '', {
        maxAge: 0, // seconds -> milliseconds
        httpOnly: true,
        sameSite: 'None',
        secure: true
    });
    res.send(dataResponse({}));
}

export async function currentUser(req, res) {
    // - get the current authenticated user;
    // - can't use userService directly because we need to filter the returned user data.
    const userId = req.params.userId;
    // get user
    const userData = await getUser(userId);
    if (userData.error) {
        res.status(userData.error.code).send(userData);
        return;
    }
    // filtering fields
    const user = {
        user_id: userData._id,
        username: userData.username,
        email: userData.email
    }

    res.send(dataResponse({ user }));
}
