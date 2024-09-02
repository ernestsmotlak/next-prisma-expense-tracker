import express from 'express';
import { addExpense, deleteExpense, getExpensesForUser, updateExpense } from '../controllers/expenseController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Route to get expenses for a specific user by username
router.get('/expenses/:username', authenticateToken, getExpensesForUser);
router.post('/expenses/addexpense/:userId', authenticateToken, addExpense);
// router.patch('/expenses/updateexpense/:expenseId', authenticateToken, updateExpense);
router.put('/expenses/update/:expenseId', authenticateToken, updateExpense);
router.delete('/expenses/delete/:expenseId', authenticateToken, deleteExpense);


export default router;
