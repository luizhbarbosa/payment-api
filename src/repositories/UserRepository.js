import prisma from '../prismaClient.js';

export default {
  async findById(id) {
    return await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
  },
};