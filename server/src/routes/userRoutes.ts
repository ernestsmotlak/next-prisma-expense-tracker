import express from "express";
import { getUserById, register } from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users/:id", authenticateToken, getUserById);
router.post('/users/register', register);

export default router;
