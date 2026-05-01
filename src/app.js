import express from 'express';
import transferRoutes from './routes/transfer.js';
import { errorMiddleware } from './controllers/errorMiddleware.js';

const app = express();

app.use(express.json());

app.use('/transfer', transferRoutes);

app.use(errorMiddleware);
export default app;