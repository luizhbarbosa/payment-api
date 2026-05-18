import prisma from '../prismaClient.js';

class UserRepository {
  async findById(id) {
    return await prisma.user.findUnique({
      where: { id: Number(id) }
    });
  }

  async updateBalance(id, newBalance, tx = prisma) {
    return await tx.user.update({
      where: { id: Number(id) },
      data: { balance: newBalance }
    });
  }
}

export default new UserRepository();