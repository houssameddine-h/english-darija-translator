import express, { json } from 'express';
import cors from 'cors';
import Translator from './Translator.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(json());

const translator = new Translator();

app.post('/api/translate', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Text field is required'
      });
    }

    const result = await translator.translate(text);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`);
});