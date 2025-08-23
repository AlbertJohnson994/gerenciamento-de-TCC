import express from "express";
import {createProposal,
  getProposals,
  getProposalById,
  updateProposal,
  deleteProposal,
  getMyProposals,
  getOrientadorProposals
} from "../controllers/proposals";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

router.get("/", authenticate, getProposals);
router.get("/my", authenticate, getMyProposals);
router.get(
  "/orientador",
  authenticate,
  authorize(["ORIENTADOR"]),
  getOrientadorProposals
);
router.get("/:id", authenticate, getProposalById);
router.post("/", authenticate, authorize(["STUDENT"]), createProposal);
router.put("/:id", authenticate, updateProposal);
router.delete("/:id", authenticate, deleteProposal);

export default router;
