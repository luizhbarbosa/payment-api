import prisma from '../prismaCliente.cjs';

class UserRepository {
  async findById(id) {
    // Busca o usuário pelo ID convertendo para número
    return await prisma.user.findUnique({
      where: { id: Number(id) }
    });
  }

  async updateBalance(id, newBalance, tx = prisma) {
    // Atualiza o saldo (pode receber uma transação 'tx' como parâmetro)
    return await tx.user.update({
      where: { id: Number(id) },
      data: { balance: newBalance }
    });
  }
}

// Exporta
export default new UserRepository();