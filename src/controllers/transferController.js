// src/controllers/transferController.js
import { makeTransfer } from '../services/transferService.js';

export const makeTransferController = async (req, res, next) => {
  const value = Number(req.body.value);
  const payer = Number(req.body.payer);
  const payee = Number(req.body.payee);

  if (isNaN(value) || value <= 0) {
    return res.status(400).json({
      error: 'O campo "value" deve ser um número maior que zero.'
    });
  }

  if (!payer || isNaN(payer)) {
    return res.status(400).json({
      error: 'O campo "payer" deve ser um número válido.'
    });
  }

  if (!payee || isNaN(payee)) {
    return res.status(400).json({
      error: 'O campo "payee" deve ser um número válido.'
    });
  }

  try {
    const result = await makeTransfer({ value, payer, payee });

    return res.status(201).json({
      message: 'Transferência realizada com sucesso!',
      data: {
        payer,
        payee,
        transactionId: result.id,
        value
      }
    });

  } catch (error) {
    return next(error);
  }
};