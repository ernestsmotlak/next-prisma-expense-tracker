import express from 'express';
import { addExpense, amountOwed, deleteExpense, getExpensesForUser, updateExpense } from '../controllers/expenseController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Route to get expenses for a specific user by username
router.get('/expenses/:username', authenticateToken, getExpensesForUser);
router.post('/expenses/addexpense', authenticateToken, addExpense);
// router.patch('/expenses/updateexpense/:expenseId', authenticateToken, updateExpense);
router.put('/expenses/update/:expenseId', authenticateToken, updateExpense);
router.delete('/expenses/delete/:expenseId', authenticateToken, deleteExpense);
router.get('/expenses/amountowed/:userId', authenticateToken, amountOwed);


export default router;
