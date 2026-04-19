/**
 * Representação da entidade Transaction (Transferência)
 */
export class Transaction {
  constructor({ id, value, payer, payee, createdAt = new Date() }) {
    this.id = id;
    this.value = value;
    this.payer = payer; // ID do usuário que envia (pagador)
    this.payee = payee; // ID do usuário que recebe (beneficiário)
    this.createdAt = createdAt;
  }
}

export default Transaction;