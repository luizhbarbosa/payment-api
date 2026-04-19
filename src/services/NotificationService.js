import axios from 'axios';

class NotificationService {
  /**
   * Simula o envio de uma notificação externa via POST.
   * @param {string} email - E-mail do destinatário.
   * @param {string} message - Conteúdo da mensagem.
   * @returns {Promise<boolean>} Retorna true se enviada, false se falhou.
   */
  async send(email, message) {
    try {
      await axios.post('https://util.devi.tools/api/v1/notify', { to: email, message });
      return true;
    } catch (error) {
      console.warn('Falha ao enviar notificação:', error.message);
      return false;
    }
  }
}

export default new NotificationService();