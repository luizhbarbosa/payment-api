/**
 * Middleware centralizado para tratamento de erros
 */
export const errorMiddleware = (err, req, res, next) => {
  // Define o status code: usa o definido no erro ou 500 para erro interno
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  // Log do erro no servidor (útil para debug em erros 500)
  if (statusCode === 500) {
    console.error(`[SERVER ERROR]: ${err.stack}`);
  }

  res.status(statusCode).json({
    status: statusCode,
    error: message,
  });
};