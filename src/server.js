import 'dotenv/config';
import app from './app.js'; // Importa o app que configuramos com Swagger

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📖 Documentação em http://localhost:${PORT}/api-docs`);
  console.log('Pressione CTRL+C para parar');
});