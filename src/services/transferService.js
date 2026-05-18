import prisma from '../prismaClient.js';
import userRepository from '../repositories/UserRepository.js';
import { UserType } from '../models/User.js';
import authorizerService from './AuthorizerService.js';
import transactionRepository from '../repositories/TransactionRepository.js';
import Transaction from '../models/Transaction.js';
import notificationService from './NotificationService.js';

export const transferMoney = async ({ value, payer: payerId, payee: payeeId }) => {

  if (value <= 0) {
    throw new Error('Valor da transferência deve ser maior que 0');
  }

  if (payerId === payeeId) {
    throw new Error('Não é possível transferir para você mesmo');
  }

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

  if (
    payer.userType?.toLowerCase() === 'merchant' ||
    payer.userType === UserType.MERCHANT
  ) {
    throw new Error('Lojistas não podem enviar dinheiro');
  }

  if (payer.balance < value) {
    throw new Error('Saldo insuficiente');
  }

  const initialPayerBalance = payer.balance;
  const initialPayeeBalance = payee.balance;

  try {

    const transactionResult = await prisma.$transaction(async (tx) => {

      // const isAuthorized = await authorizerService.authorize();
      const isAuthorized = true;

      if (!isAuthorized) {
        throw new Error('Transferência não autorizada pelo serviço externo');
      }

      const updatedPayer = await tx.user.update({
        where: { id: payerId },
        data: { balance: { decrement: value } },
      });

      const updatedPayee = await tx.user.update({
        where: { id: payeeId },
        data: { balance: { increment: value } },
      });

      await tx.transaction.create({
        data: {
          value,
          payerId,
          payeeId
        }
      });

      return {
        message: 'Transferência realizada com sucesso',
        payer: {
          id: payer.id,
          balance: updatedPayer.balance
        },
        payee: {
          id: payee.id,
          balance: updatedPayee.balance
        }
      };
    });

    notificationService
      .send(
        payee.email,
        `Você recebeu R$ ${value} de ${payer.fullName}`
      )
      .catch(() => {});

    return transactionResult;

  } catch (error) {

    if (payer) payer.balance = initialPayerBalance;
    if (payee) payee.balance = initialPayeeBalance;

    throw error;
  }
};