import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Limpando banco de dados...');
  // Limpa transferências antes de usuários por causa das chaves estrangeiras
  try {
    await prisma.transfer.deleteMany();
    await prisma.user.deleteMany();
  } catch (e) {
    console.log('Aviso: Tabelas ainda não existem ou já estão limpas.');
  }

  console.log('Semeando usuários...');
  const passwordHash = await bcrypt.hash('123456', 10);

  // Usuário Comum (Pode enviar e receber)
  const user1 = await prisma.user.create({
    data: {
      fullName: 'Luciano Sabino',
      document: '12345678900',
      email: 'luciano@example.com',
      password: passwordHash,
      userType: 'user',
      balance: 100.00
    },
  });

  // Lojista (Só pode receber)
  const merchant = await prisma.user.create({
    data: {
      fullName: 'Loja Exemplo',
      document: '12345678000199',
      email: 'loja@example.com',
      password: passwordHash,
      userType: 'merchant',
      balance: 0.00
    },
  });

  console.log({ user1, merchant });
  console.log('Seed finalizado com sucesso!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Erro ao executar seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
