const API_URL = 'http://localhost:3000/api/v1';

const formElement = document.getElementById('signup-form');
const nameElement = document.getElementById('name');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const errorElement = document.querySelector('.error');

formElement.addEventListener('submit', async e => {
    e.preventDefault();
    const result = await signUpUser(nameElement.value, emailElement.value, passwordElement.value);
    if (result.error) {
        showError(result.message);
    }
});

async function signUpUser(name, email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }),
            credentials: 'include'
        });
        const signupData = await response.json();
        console.log(signupData);
        const signupStatus = {};
        if (signupData.error) {
            signupStatus.error = true;
            switch (signupData.error.code) {
                case 400:
                    signupStatus.message = 'Invalid data: ' + signupData.error.error[0];
                    break;
                case 500:
                    signupStatus.message = 'Server error';
            }
        } else {
            // redirect to home
            window.location = '/login';
        }
        return signupStatus;
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