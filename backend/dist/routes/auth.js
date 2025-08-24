// Replace require with import
import express from 'express';
import { register, login, getMe } from '../controllers/auth';
import { authenticate } from '../middleware/auth';
// Create router
export const router = express.Router();
// Define routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);
export default router;
//# sourceMappingURL=auth.js.map