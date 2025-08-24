import { Request, Response } from 'express';
import { z } from 'zod';
import { FirebaseService } from '../services/firebaseService';

// Extend Express Request type to include 'user'
declare global {
  namespace Express {
    interface User {
      id: string;
      name: string;
      role: string;
      // Add other properties as needed
    }
    interface Request {
      user?: User;
    }
  }
}

// Validation schemas
const createProposalSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  author: z.string().min(1, 'Nome do autor é obrigatório'),
  advisor: z.string().min(1, 'Nome do orientador é obrigatório'),
  abstract: z.string().min(1, 'Resumo é obrigatório'),
  keywords: z.string().min(1, 'Palavras-chave são obrigatórias'),
});

const updateProposalSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').optional(),
  description: z.string().min(1, 'Descrição é obrigatória').optional(),
  author: z.string().min(1, 'Nome do autor é obrigatório').optional(),
  advisor: z.string().min(1, 'Nome do orientador é obrigatório').optional(),
  abstract: z.string().min(1, 'Resumo é obrigatório').optional(),
  keywords: z.string().min(1, 'Palavras-chave são obrigatórias').optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'REVISION']).optional(),
  feedback: z.string().optional(),
});

export const createProposal = async (req: Request, res: Response) => {
  try {
    const validatedData = createProposalSchema.parse(req.body);
    
    if (!req.user) {
      return res.status(401).json({
        message: 'Usuário não autenticado',
      });
    }

    const proposalId = await FirebaseService.createProposal({
      ...validatedData,
      studentId: req.user.id,
      status: 'PENDING'
    });

    res.status(201).json({
      message: 'Proposta criada com sucesso!',
      proposalId
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.errors,
      });
    }

    console.error("Error creating proposal:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export const getProposals = async (req: Request, res: Response) => {
  try {
    const { status, studentId, advisor } = req.query;

    const proposals = await FirebaseService.getProposals({
      status: status as string,
      studentId: studentId as string,
      advisor: advisor as string
    });

    res.json({
      proposals,
      pagination: {
        page: 1,
        limit: proposals.length,
        total: proposals.length,
        pages: 1,
      },
    });
  } catch (error) {
    console.error("Error fetching proposals:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export const getProposalById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const proposal = await FirebaseService.getProposalById(id);
    
    if (!proposal) {
      return res.status(404).json({
        message: "Proposta não encontrada",
      });
    }

    res.json(proposal);
  } catch (error) {
    console.error("Error fetching proposal:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export const updateProposal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateProposalSchema.parse(req.body);

    if (!req.user) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    // Check if proposal exists
    const existingProposal = await FirebaseService.getProposalById(id);
    if (!existingProposal) {
      return res.status(404).json({
        message: "Proposta não encontrada",
      });
    }

    // Students can only update their own proposals
    if (req.user.role === "STUDENT" && existingProposal.studentId !== req.user.id) {
      return res.status(403).json({
        message: "Você só pode editar suas próprias propostas",
      });
    }

    // Students cannot change status
    if (req.user.role === "STUDENT" && validatedData.status) {
      delete validatedData.status;
      delete validatedData.feedback;
    }

    await FirebaseService.updateProposal(id, validatedData);

    res.json({
      message: "Proposta atualizada com sucesso!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.errors,
      });
    }

    console.error("Error updating proposal:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export const deleteProposal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    // Check if proposal exists
    const existingProposal = await FirebaseService.getProposalById(id);
    if (!existingProposal) {
      return res.status(404).json({
        message: "Proposta não encontrada",
      });
    }

    // Students can only delete their own proposals
    if (req.user.role === "STUDENT" && existingProposal.studentId !== req.user.id) {
      return res.status(403).json({
        message: "Você só pode excluir suas próprias propostas",
      });
    }

    await FirebaseService.deleteProposal(id);

    res.json({
      message: "Proposta excluída com sucesso!",
    });
  } catch (error) {
    console.error("Error deleting proposal:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export const getMyProposals = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    const { status } = req.query;

    const proposals = await FirebaseService.getProposals({
      studentId: req.user.id,
      status: status as string
    });

    res.json({
      proposals,
      pagination: {
        page: 1,
        limit: proposals.length,
        total: proposals.length,
        pages: 1,
      },
    });
  } catch (error) {
    console.error("Error fetching user proposals:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export const getOrientadorProposals = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    const { status } = req.query;

    const proposals = await FirebaseService.getProposals({
      advisor: req.user.name,
      status: status as string
    });

    res.json({
      proposals,
      pagination: {
        page: 1,
        limit: proposals.length,
        total: proposals.length,
        pages: 1,
      },
    });
  } catch (error) {
    console.error("Error fetching orientador proposals:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};