import { Router } from 'express';
import { makeTransferController } from '../controllers/transferController.js';

const router = Router();

/**
 * @openapi
 * /transfer:
 *   post:
 *     summary: Realiza uma transferência
 *     tags:
 *       - Transfer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - value
 *               - payer
 *               - payee
 *             properties:
 *               value:
 *                 type: number
 *                 example: 100
 *               payer:
 *                 type: number
 *                 example: 1
 *               payee:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Transferência realizada com sucesso
 *       400:
 *         description: Erro de validação (valor inválido ou auto-transferência)
 *       404:
 *         description: Usuário pagador ou recebedor não encontrado
 *       500:
 *         description: Erro interno ou transferência não autorizada
 */
router.post('/', makeTransferController);

export default router;