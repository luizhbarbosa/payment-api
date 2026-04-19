import axios from 'axios';

class AuthorizerService {
  /**
   * Consulta o serviço autorizador externo para validar a transação.
   * @returns {Promise<boolean>} Retorna true se autorizado, false para qualquer outro caso ou erro.
   */
  async authorize() {
    try {
      const response = await axios.get('https://util.devi.tools/api/v2/authorize');
      return response.data?.status === 'AUTHORIZED';
    } catch (error) {
      return false;
    }
  }
}

export default new AuthorizerService();