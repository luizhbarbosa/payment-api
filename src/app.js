// 1. Defina as configurações (A receita)
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import transferRoutes from './routes/transfer.js';

const app = express();
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment API',
      version: '1.0.0',
      description: 'API de Transferências',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  // Este caminho deve apontar para onde está o seu comentário @swagger
  apis: ['./src/routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/transfer', transferRoutes);

export default app;

