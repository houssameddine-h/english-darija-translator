import express from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import { API_VERSION } from './config/config.js';
import AuthRouter from './src/v1/routes/authRoutes.js';
import TranslationRouter from './src/v1/routes/translationRoutes.js';

const { json } = bodyParser;

const app = express();
const PORT = process.env.PORT || 3001;

// middlewares
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5500',
}));
app.use(json());
app.use(cookieParser());

// routes
app.use(`/api/v${API_VERSION}/translate`, TranslationRouter);
app.use(`/api/v${API_VERSION}/auth`, AuthRouter);

app.listen(PORT, () => console.log(`App is listening on port...${PORT}`));