import { getUserById, getUserByEmail } from '../database/User.js';
import { status_codes, errors as _errors } from '../../config/config.js';
import { errorResponse } from '../database/utils.js';

export async function getUser(userId) {
    if (userId) {
        try {
            return await getUserById(userId);
        } catch (e) {
            return errorResponse(status_codes.NOT_FOUND_SC, _errors.USER_NOT_FOUND_ERROR);
        }  
    }
    return errorResponse(status_codes.BAD_REQUEST_SC, _errors.INVALID_USER_DATA_ERROR);
}