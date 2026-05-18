class Transaction {
  constructor(payerId, payeeId, amount) {
    this.payerId = payerId;
    this.payeeId = payeeId;
    this.amount = amount;
    this.timestamp = new Date();
  }
}

export default Transaction;