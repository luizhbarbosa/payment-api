const prisma = require('./prismaClient.cjs');
const bcrypt = require('bcrypt');

async function main() {
  const passwordHash = await bcrypt.hash('123456', 10);

  const user1 = await prisma.user.create({
    data: {
      fullName: 'Luciano Sabino',
      document: '12345678900',
      email: 'luciano@example.com',
      password: passwordHash,
      userType: 'user',
      balance: 100
    }
  });

  const user2 = await prisma.user.create({
    data: {
      fullName: 'João Silva',
      document: '98765432100',
      email: 'joao@example.com',
      password: passwordHash,
      userType: 'user',
      balance: 50
    }
  });

  const merchant = await prisma.user.create({
    data: {
      fullName: 'Loja Exemplo',
      document: '12345678000199',
      email: 'loja@example.com',
      password: passwordHash,
      userType: 'merchant',
      balance: 0
    }
  });

  console.log('Seed finalizado');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });