
export function dataResponse(data) {
    return { status: 'ok', data};
}

export function errorResponse(message, code = 500) {
    return { status: 'ko', data: message, code, error: true };
}