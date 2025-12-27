const API_URL = 'http://localhost:3000/api/v1';

const formElement = document.getElementById('login-form');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const errorElement = document.querySelector('.error');

formElement.addEventListener('submit', async e => {
    e.preventDefault();
    const result = await logInUser(emailElement.value, passwordElement.value);
    if (result.error) {
        showError(result.message);
    }
});

async function logInUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        const loginData = await response.json();
        const loginStatus = {};
        if (loginData.error) {
            loginStatus.error = true;
            switch (loginData.error.code) {
                case 400:
                    loginStatus.message = 'Invalid credentials. Please try again.';
                    break;
                case 500:
                    loginStatus.message = 'Server error. Please try again later.';
            }
        } else {
            // redirect to home
            window.location = '/';
        }
        return loginStatus;
    } catch (e) {
        console.error(e);
        return {
            error: true,
            message: 'Unexpected error.'
        }
    }
}

function showError(message) {
    errorElement.innerText = message;
    errorElement.style.display = 'inline-block';
}