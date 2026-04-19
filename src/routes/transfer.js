import { Router } from 'express';
import { makeTransfer } from '../controllers/transferController.js';

const router = Router();

router.post('/', makeTransfer);

export default router;