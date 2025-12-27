import { USERNAME_REGEXP, EMAIL_REGEXP, MIN_PWD_LENGTH } from '../../config/config.js';

export function validateUserData(user, allFieldsRequired = true) {
    const validUser = {};
    const errors = [];

    const username = user.username?.trim();
    if (username) {
        if (!USERNAME_REGEXP.test(username))
            errors.push('Invalid Username');
        else
            validUser.username = username;
    }

    const email = user.email;
    if (email) {
        if (!EMAIL_REGEXP.test(email))
            errors.push('Invalid Email Address');
        else
            validUser.email = email;
    }

    const password = user.password;
    if (password) {
        if (password.length < MIN_PWD_LENGTH)
            errors.push('Invalid Password');
        else
            validUser.password = password;
    }

    if (Object.keys(validUser).length < 3 && allFieldsRequired) {
        if (errors.length > 0)
            return { isValid: false, errors };
        else
            return { isValid: false, errors: [ 'All Fields Are Required' ] }
    }

    return { isValid: true, validUser};
}

export function validateLoginData(email, password) {
    let validEmail = '';
    let validPwd = '';
    const errors = [];

    if (email && EMAIL_REGEXP.test(email))
        validEmail = email;
    else
        errors.push('Invalid Email Address');

    if (password && password.length >= MIN_PWD_LENGTH)
        validPwd = password;
    else
        errors.push('Invalid Password');

    if (errors.length === 0)
        return { isValid: true, validEmail, validPwd };
    
    return { isValid: false, errors };
}

export function errorResponse(code, error) {
    return { 
        error: { status: 'KO', code, error }
     };
}
