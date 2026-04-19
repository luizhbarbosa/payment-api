import express from 'express';
import transferRoutes from './routes/transfer.js';

const app = express();

app.use(express.json());

app.use('/transfer', transferRoutes);

export default app;