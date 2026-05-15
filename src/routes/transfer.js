import { Router } from 'express';
import { createTransfer } from '../controllers/transferController.js';

const router = Router();

/**
 * @swagger
 * /transfer:
 * post:
 * summary: Realiza transferencia
 * requestBody:
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * value:
 * type: number
 * payer:
 * type: integer
 * payee:
 * type: integer
 * responses:
 * 201:
 * description: OK
 */
router.post('/', createTransfer);

export default router;