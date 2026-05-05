import { Router } from 'express';
// Importe aqui apenas os seus CONTROLLERS, por exemplo:
// import { transferController } from '../controllers/transferController.js';

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
router.post('/', (req, res) => {
    // Sua lógica de rota aqui
});

export default router;