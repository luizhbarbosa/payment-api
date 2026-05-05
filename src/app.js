import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import transferRoutes from './routes/transfer.js';
import { errorMiddleware } from './controllers/errorMiddleware.js';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// 🔧 Configuração de caminho (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔧 Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment API',
      version: '1.0.0',
      description: 'API de Transferências e E-books',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [path.join(__dirname, 'routes/*.js')],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middlewares
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
app.use('/transfer', transferRoutes);

// Error handler
app.use(errorMiddleware);

// ✅ EXPORT CORRETO
export default app;