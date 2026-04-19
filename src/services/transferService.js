import prisma from '../prismaCliente.cjs';
import userRepository from '../../UserRepository.js';
import { UserType } from '../../User.js';
import authorizerService from './AuthorizerService.js';
import transactionRepository from '../../TransactionRepository.js';
import Transaction from '../models/Transaction.js';
import notificationService from './NotificationService.js';

/**
 * Função principal de transferência de dinheiro
 * @param {Object} param0
 * @param {number} param0.value - Valor da transferência
 * @param {number} param0.payer - ID do usuário que envia
 * @param {number} param0.payee - ID do usuário que recebe
 * @returns {Object} Resultado da transferência
 */
export const transferMoney = async ({ value, payer: payerId, payee: payeeId }) => {
  // Validação inicial
  if (value <= 0) throw new Error('Valor da transferência deve ser maior que 0');
  if (payerId === payeeId) throw new Error('Não é possível transferir para você mesmo');

  // Buscar usuários via repository (Validação de existência)
  const payer = userRepository.findById(payerId);
  const payee = userRepository.findById(payeeId);

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

  // Regra: MERCHANT NÃO pode transferir
  if (payer.userType === UserType.MERCHANT) {
    throw new Error('Lojistas não podem enviar dinheiro');
  }

  // Regra: Validar saldo suficiente
  if (payer.balance < value) {
    throw new Error('Saldo insuficiente');
  }

  // Guardar saldo antigo para garantir consistência em memória (Tarefa 3.7)
  const initialPayerBalance = payer.balance;
  const initialPayeeBalance = payee.balance;

  try {
    // Iniciar transação
    const transactionResult = await prisma.$transaction(async (tx) => {
      // Chamar serviço autorizador externo (Tarefa 3.5)
      const isAuthorized = await authorizerService.authorize();

      if (!isAuthorized) {
        throw new Error('Transferência não autorizada pelo serviço externo');
      }

      // Atualizar saldos no banco (Tarefa 3.6 - Débito e Crédito)
      const updatedPayer = await tx.user.update({
        where: { id: payerId },
        data: { balance: { decrement: value } },
      });

      const updatedPayee = await tx.user.update({
        where: { id: payeeId },
        data: { balance: { increment: value } },
      });

      // Sincronizar objetos em memória com o novo estado do banco (Tarefa 3.7)
      payer.balance = updatedPayer.balance;
      payee.balance = updatedPayee.balance;

      // Registrar transação no histórico (Tarefa 3.8)
      const transactionRecord = new Transaction({
        value,
        payer: payerId,
        payee: payeeId,
      });
      transactionRepository.create(transactionRecord);

      return {
        message: 'Transferência realizada com sucesso',
        payer: { id: payer.id, balance: updatedPayer.balance },
        payee: { id: payee.id, balance: updatedPayee.balance },
      };
    });

    // Notificação enviada fora da transação (Tarefa 3.10)
    // Se falhar, o erro é capturado dentro do service e apenas logado,
    // sem interromper o retorno de sucesso para o cliente.
    notificationService.send(
      payee.email,
      `Você recebeu R$ ${value} de ${payer.fullName}`
    );

    return transactionResult;
  } catch (error) {
    // Restaurar valores em caso de erro para manter consistência no UserRepository (Tarefa 3.7)
    payer.balance = initialPayerBalance;
    payee.balance = initialPayeeBalance;
    throw error;
  }
};