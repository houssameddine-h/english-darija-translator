const API_URL = 'http://localhost:3000/api/v1';

const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const translateBtn = document.getElementById('translateBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const charCount = document.getElementById('charCount');
const loading = document.getElementById('loading');
const statusMessage = document.getElementById('statusMessage');
const authContainer = document.querySelector('.auth-buttons');
const translationContainer = document.querySelector('.translator-box');
const actionsContainer = document.querySelector('.actions');
const logoutBtn = document.getElementById('logout-btn');
const speakerBtn = document.getElementById('speakerBtn');

inputText.addEventListener('input', () => {
    const count = inputText.value.length;
    charCount.textContent = count;

    if (count === 0) {
        outputText.value = '';
        copyBtn.style.display = 'none';
    }
});

logoutBtn.addEventListener('click', e => {
    e.preventDefault();
    logoutUser();
});

async function logoutUser() {
    await fetch(`${API_URL}/auth/logout`, {
        credentials: 'include'
    });
    window.location = '/frontend';
}

async function translate() {
    const text = inputText.value.trim();

    if (!text) {
        showStatus('Please enter some text to translate', 'error');
        return;
    }

    translateBtn.disabled = true;
    loading.classList.add('active');
    statusMessage.style.display = 'none';
    outputText.value = '';
    copyBtn.style.display = 'none';

    try {
        const response = await fetch(`${API_URL}/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        const jsonData = await response.json();
        // console.log(response);
        console.log(jsonData);

        if (jsonData.status == 'ok') {
            outputText.value = jsonData.data.translation;
            copyBtn.style.display = 'block';
            speakerBtn.style.display = 'block'; // Show speaker button
            showStatus('Translation completed successfully!', 'success');
        } else {
            throw new Error(jsonData.error.data || 'Translation failed');
        }
    } catch (error) {
        console.error('Translation error:', error);
        showStatus(`Error: ${error.message}.`, 'error');
    } finally {
        translateBtn.disabled = false;
        loading.classList.remove('active');
    }
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    // You can customize properties like voice, pitch, rate here
    // utterance.voice = voices[0];
    // utterance.pitch = 1;
    // utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
}

function clear() {
    inputText.value = '';
    outputText.value = '';
    charCount.textContent = '0';
    copyBtn.style.display = 'none';
    speakerBtn.style.display = 'none'; // Hide speaker button on clear
    statusMessage.style.display = 'none';
}

async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(outputText.value);
        showStatus('Translation copied to clipboard!', 'success');
    } catch (error) {
        showStatus('Failed to copy to clipboard', 'error');
    }
}

function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    statusMessage.style.display = 'block';

    setTimeout(() => {
        statusMessage.style.display = 'none';
    }, 5000);
}

translateBtn.addEventListener('click', translate);
clearBtn.addEventListener('click', clear);
copyBtn.addEventListener('click', copyToClipboard);
speakerBtn.addEventListener('click', () => speakText(outputText.value)); // Add event listener for speaker button

const userAvatar = document.getElementById('userAvatar');
const dropdownMenu = document.getElementById('dropdownMenu');

if (userAvatar) {
    userAvatar.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
}

window.addEventListener('click', (event) => {
    if (dropdownMenu && userAvatar && !userAvatar.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

async function getUser() {
    const response = await fetch(`${API_URL}/auth/user`, {
        credentials: 'include'
    });
    const jsonRes = await response.json();
    console.log(jsonRes);
    if (jsonRes.status == 'ok') {
        showUserInfo(jsonRes.data.user);
    } else {
        showAuthActions();
    }
}

function showUserInfo(user) {
    document.getElementById('userAvatar').innerText = user.username[0].toUpperCase();
}

function showAuthActions() {
    // show login/signup btns
    authContainer.style.display = 'flex';
    // hide translation areas and btns
    translationContainer.style.display = 'none';
    // hide translation btns
    actionsContainer.style.display = 'none';
    // hide user avatar
    userAvatar.style.display = 'none';
}

addEventListener('load', getUser);