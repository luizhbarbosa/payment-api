// src/services/NotificationService.js

import axios from 'axios';

class NotificationService {
  async send(email, message) {
    try {
      await axios.post('https://util.devi.tools/api/v1/notify');
    } catch (error) {
      console.warn('Falha ao enviar notificação:', error.message);
    }
  }
}

export default new NotificationService();