import { Router } from 'express';
import { createTransfer } from '../controllers/transferController.js';

const router = Router();

// A rota POST /transfer continua funcionando normalmente para receber as requisições
router.post('/', createTransfer);

export default router;