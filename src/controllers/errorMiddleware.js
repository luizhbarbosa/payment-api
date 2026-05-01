export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  const message =
    statusCode === 500 && isProduction
      ? 'Erro interno do servidor'
      : err.message || 'Erro inesperado';

  if (statusCode === 500) {
    console.error('[SERVER ERROR]:', err.stack || err.message);
  }

  return res.status(statusCode).json({
    status: statusCode,
    error: message,
    timestamp: new Date().toISOString(),
  });
};