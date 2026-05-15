import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment API',
      version: '1.0.0',
      description: 'API para transferência de valores entre usuários (Comuns e Lojistas)',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            fullName: { type: 'string' },
            document: { type: 'string' },
            email: { type: 'string' },
            userType: { type: 'string', enum: ['user', 'merchant'] },
            balance: { type: 'number', format: 'float' },
          },
        },
        Transfer: {
          type: 'object',
          required: ['value', 'payer', 'payee'],
          properties: {
            value: { type: 'number', minimum: 0.01, example: 100.0 },
            payer: { type: 'integer', example: 1 },
            payee: { type: 'integer', example: 2 },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/server.js'], // Caminho para onde estarão as anotações
};

export const specs = swaggerJsdoc(options);
