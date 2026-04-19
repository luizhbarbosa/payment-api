import { transferMoney } from '../services/transferService.js';

export const makeTransfer = async (req, res, next) => {
  const { value, payer, payee } = req.body;

  // Validação do Body (Tarefa 4.1)
  if (value === undefined || typeof value !== 'number' || value <= 0) {
    return res.status(400).json({ error: 'O campo "value" deve ser um número maior que zero.' });
  }

  if (!payer) {
    return res.status(400).json({ error: 'O campo "payer" (ID do pagador) é obrigatório.' });
  }

  if (!payee) {
    return res.status(400).json({ error: 'O campo "payee" (ID do recebedor) é obrigatório.' });
  }

  try {
    const result = await transferMoney({ value, payer, payee });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};