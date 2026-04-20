// src/controllers/transferController.js

import { transferMoney } from '../services/transferService.js';

export const makeTransfer = async (req, res, next) => {
  const { value, payer, payee } = req.body;

  if (value === undefined || typeof value !== 'number' || value <= 0) {
    return res.status(400).json({
      error: 'O campo "value" deve ser um número maior que zero.'
    });
  }

  if (!payer || typeof payer !== 'number') {
    return res.status(400).json({
      error: 'O campo "payer" deve ser um número válido.'
    });
  }

  if (!payee || typeof payee !== 'number') {
    return res.status(400).json({
      error: 'O campo "payee" deve ser um número válido.'
    });
  }

  try {
    const result = await transferMoney({ value, payer, payee });
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};