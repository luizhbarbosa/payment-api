// src/services/AuthorizerService.js

import axios from 'axios';

class AuthorizerService {
  async authorize() {
    try {
      const response = await axios.get('https://util.devi.tools/api/v2/authorize');

      return response.data?.status === 'success';
    } catch (error) {
      return false;
    }
  }
}

export default new AuthorizerService();