import express from 'express';
import { addExpense, getExpensesForUser, updateExpense } from '../controllers/expenseController';
import { authenticateToken } from '../middleware/authMiddleware';
import {createGroup, showAllGroups, showGroup} from '../controllers/groupController';

const router = express.Router();

router.post('/:creatorId', authenticateToken, createGroup);
router.get('/:groupId', authenticateToken, showGroup);
router.get('/showallgroups/:userId', authenticateToken, showAllGroups);

export default router;