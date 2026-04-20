// src/app.js
import express from 'express';
import transferRoutes from './routes/transfer.js';

const app = express();

app.use(express.json());

// 👇 ESSENCIAL
app.use('/transfer', transferRoutes);

export default app;