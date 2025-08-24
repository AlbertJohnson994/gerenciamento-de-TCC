import express from "express";
import { createProposal, getProposals, getProposalById, updateProposal, deleteProposal, getMyProposals, getOrientadorProposals } from "../controllers/proposals";
import { authenticate, authorize } from "../middleware/auth";
const router = express.Router();
// Todas as propostas (visão geral)
router.get("/", authenticate, getProposals);
// Propostas do aluno logado
router.get("/my", authenticate, authorize(["STUDENT"]), getMyProposals);
// Propostas do orientador logado
router.get("/orientador", authenticate, authorize(["ORIENTADOR"]), getOrientadorProposals);
// Buscar proposta específica
router.get("/:id", authenticate, getProposalById);
// Criar proposta (apenas estudante)
router.post("/", authenticate, authorize(["STUDENT"]), createProposal);
// Atualizar proposta (autor ou coordenador, depende da lógica no controller)
router.put("/:id", authenticate, updateProposal);
// Deletar proposta (apenas coordenador/admin, depende da lógica no controller)
router.delete("/:id", authenticate, deleteProposal);
export default router;
//# sourceMappingURL=proposals.js.map