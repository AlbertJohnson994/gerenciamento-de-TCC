import express from 'express';
import { register, login, getMe } from '../controllers/auth';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route
router.get('/me', authenticate, getMe);

export default router;