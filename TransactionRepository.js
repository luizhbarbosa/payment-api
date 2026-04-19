class TransactionRepository {
  constructor() {
    this.transactions = [];
  }

  /**
   * Registra uma nova transferência no sistema
   * @param {Object} transaction - Objeto da transação
   */
  create(transaction) {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default new TransactionRepository();