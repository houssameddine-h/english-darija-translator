const API_URL = 'http://localhost:3000/api/translate';

document.addEventListener('DOMContentLoaded', () => {
  const inputText = document.getElementById('inputText');
  const translateBtn = document.getElementById('translateBtn');
  const resultDiv = document.getElementById('result');

  translateBtn.addEventListener('click', async () => {
    const textToTranslate = inputText.value.trim();

    if (!textToTranslate) {
      resultDiv.textContent = 'Please enter some text.';
      return;
    }

    resultDiv.textContent = 'Translating...';

    try {
      const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: textToTranslate })
        });

      const data = await response.json();

      if (data.success) {
            resultDiv.textContent = data.translation;
      }

    } catch (error) {
      console.error('Translation failed:', error);
      resultDiv.textContent = `Error: Could not connect to the translation service.`;
    }
  });
});
