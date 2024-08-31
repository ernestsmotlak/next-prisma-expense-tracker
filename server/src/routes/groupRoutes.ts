import express from 'express';
import { addExpense, getExpensesForUser, updateExpense, updateExpense2 } from '../controllers/expenseController';
import { authenticateToken } from '../middleware/authMiddleware';
import {createGroup, showGroup} from '../controllers/groupController';

const router = express.Router();

router.post('/:creatorId', authenticateToken, createGroup);
router.get('/:groupId', authenticateToken, showGroup);

export default router;