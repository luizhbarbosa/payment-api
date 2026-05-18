import { Router } from 'express';
class TransactionRepository {
  async create(data) {
    return await prisma.transaction.create({
      data: {
        payerId: data.payerId,
        payeeId: data.payeeId,
        amount: data.amount,
      },
    });
  }
}
export default new TransactionRepository();

