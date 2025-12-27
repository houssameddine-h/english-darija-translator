import express from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import { API_VERSION } from './config/config.js';
// import StudentRouter from './v1/routes/studentRoutes.js';
// import UniversityRouter from './v1/routes/universityRoutes.js';
// import MasterRouter from './v1/routes/masterRoutes.js';
// import { initData } from './controllers/utils.js';
import AuthRouter from './src/v1/routes/authRoutes.js';
import TranslationRouter from './src/v1/routes/translationRoutes.js';

const { json } = bodyParser;

// initData();
const app = express();
const PORT = process.env.PORT || 3001;

// middlewares
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5500',
    // methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(json());
app.use(cookieParser());

// routes
app.use(`/api/v${API_VERSION}/translate`, TranslationRouter);
app.use(`/api/v${API_VERSION}/auth`, AuthRouter);
// app.use(`/api/v${API_VERSION}/auth`, AuthRouter);
// app.use(`/api/v${API_VERSION}/students`, StudentRouter);
// app.use(`/api/v${API_VERSION}/universities`, UniversityRouter);
// app.use(`/api/v${API_VERSION}/masters`, MasterRouter);

app.listen(PORT, () => console.log(`App is listening on port...${PORT}`));