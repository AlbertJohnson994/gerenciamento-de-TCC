import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile
} from '../controllers/users';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Todas as rotas precisam de autenticação
router.use(authenticate);

// Rotas públicas (para o próprio usuário)
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Rotas admin apenas
router.get('/', authorize(['ADMIN']), getUsers);
router.get('/:id', authorize(['ADMIN']), getUserById);
router.post('/', authorize(['ADMIN']), createUser);
router.put('/:id', authorize(['ADMIN']), updateUser);
router.delete('/:id', authorize(['ADMIN']), deleteUser);

export default router;