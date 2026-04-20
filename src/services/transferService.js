import prisma from '../prismaCliente.cjs';
import userRepository from '../../UserRepository.js';
import { UserType } from '../../User.js';
import authorizerService from './AuthorizerService.js';
import transactionRepository from '../../TransactionRepository.js';
import Transaction from '../models/Transaction.js';
import notificationService from './NotificationService.js';

export const transferMoney = async ({ value, payer: payerId, payee: payeeId }) => {
  // ✅ Validação inicial
  if (value <= 0) throw new Error('Valor da transferência deve ser maior que 0');
  if (payerId === payeeId) throw new Error('Não é possível transferir para você mesmo');

  // ✅ CORREÇÃO: usar await
  const payer = await userRepository.findById(payerId);
  const payee = await userRepository.findById(payeeId);

  if (!payer) {
    const error = new Error('Usuário pagador não encontrado');
    error.statusCode = 404;
    throw error;
  }

  if (!payee) {
    const error = new Error('Usuário recebedor não encontrado');
    error.statusCode = 404;
    throw error;
  }

  // ⚠️ Ajuste aqui conforme seu banco
  if (payer.userType === UserType.MERCHANT || payer.type === 'MERCHANT') {
    throw new Error('Lojistas não podem enviar dinheiro');
  }

  if (payer.balance < value) {
    throw new Error('Saldo insuficiente');
  }

  const initialPayerBalance = payer.balance;
  const initialPayeeBalance = payee.balance;

  try {
    const transactionResult = await prisma.$transaction(async (tx) => {

      // ✅ Autorizador
      const isAuthorized = await authorizerService.authorize();

      if (!isAuthorized) {
        throw new Error('Transferência não autorizada pelo serviço externo');
      }

      // ✅ Atualizar saldo
      const updatedPayer = await tx.user.update({
        where: { id: payerId },
        data: { balance: { decrement: value } },
      });

      const updatedPayee = await tx.user.update({
        where: { id: payeeId },
        data: { balance: { increment: value } },
      });

      payer.balance = updatedPayer.balance;
      payee.balance = updatedPayee.balance;

      // ✅ CORREÇÃO: usar tx + await
      await tx.transaction.create({
        data: {
          value,
          payerId,
          payeeId
        }
      });

      return {
        message: 'Transferência realizada com sucesso',
        payer: { id: payer.id, balance: updatedPayer.balance },
        payee: { id: payee.id, balance: updatedPayee.balance },
      };
    });

    // ✅ CORREÇÃO: não quebrar fluxo se falhar
    notificationService
      .send(
        payee.email,
        `Você recebeu R$ ${value} de ${payer.fullName}`
      )
      .catch(() => {});

    return transactionResult;

  } catch (error) {
    payer.balance = initialPayerBalance;
    payee.balance = initialPayeeBalance;
    throw error;
  }
};
