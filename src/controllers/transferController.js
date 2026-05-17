import { transferMoney } from '../services/transferService.js';

export const createTransfer = async (req, res) => {
    const { value, payer, payee } = req.body;

    // Validações básicas de entrada
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
        // Chama o serviço que você criou para processar a lógica no banco
        const result = await transferMoney({ value, payer, payee });
        
        return res.status(201).json({
            message: "Transferência realizada com sucesso!",
            data: result
        });
    } catch (error) {
        console.error("Erro no Controller:", error.message);
        return res.status(400).json({ error: error.message });
    }
};