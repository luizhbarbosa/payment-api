import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import transferRoutes from './routes/transfer.js';
import { errorMiddleware } from './controllers/errorMiddleware.js';

const app = express();

// Configuração do Swagger
const swaggerOptions = {
  swaggerDefinition: {
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
  apis: ['./src/routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.json());

// Rota da Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Suas rotas
app.use('/transfer', transferRoutes);

app.use(errorMiddleware);

export default app;