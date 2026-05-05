import { Router } from 'express';
import { makeTransfer } from '../controllers/transferController.js';

const router = Router();

/**
 * @openapi
 * /transfer:
 *   post:
 *     summary: Realiza uma transferência
 *     description: Rota para processar novos pagamentos.
 *     responses:
 *       200:
 *         description: Sucesso.
 */
router.post('/', makeTransfer);

export default router;