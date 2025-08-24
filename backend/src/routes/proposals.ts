import express from 'express';
import {
  createProposal,
  getProposals,
  getProposalById,
  updateProposal,
  deleteProposal,
  getMyProposals,
  getOrientadorProposals
} from '../controllers/proposals';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Todas as rotas precisam de autenticação
router.use(authenticate);

// Rotas públicas
router.get('/', getProposals);
router.get('/my', authorize(['STUDENT']), getMyProposals);
router.get('/orientador', authorize(['ORIENTADOR']), getOrientadorProposals);
router.get('/:id', getProposalById);

// Criar proposta (apenas estudantes)
router.post('/', authorize(['STUDENT']), createProposal);

// Atualizar e deletar (com permissões específicas)
router.put('/:id', updateProposal);
router.delete('/:id', deleteProposal);

export default router;