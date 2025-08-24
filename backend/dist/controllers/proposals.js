import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
const prisma = new PrismaClient();
// Validation schemas
const createProposalSchema = z.object({
    title: z.string().min(1, 'Título é obrigatório'),
    author: z.string().min(1, 'Nome do autor é obrigatório'),
    advisor: z.string().min(1, 'Nome do orientador é obrigatório'),
    abstract: z.string().min(1, 'Resumo é obrigatório'),
    keywords: z.string().min(1, 'Palavras-chave são obrigatórias'),
});
const updateProposalSchema = z.object({
    title: z.string().min(1, 'Título é obrigatório').optional(),
    author: z.string().min(1, 'Nome do autor é obrigatório').optional(),
    advisor: z.string().min(1, 'Nome do orientador é obrigatório').optional(),
    abstract: z.string().min(1, 'Resumo é obrigatório').optional(),
    keywords: z.string().min(1, 'Palavras-chave são obrigatórias').optional(),
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'REVISION']).optional(),
    feedback: z.string().optional(),
});
export const createProposal = async (req, res) => {
    try {
        const validatedData = createProposalSchema.parse(req.body);
        if (!req.user) {
            return res.status(401).json({
                message: 'Usuário não autenticado',
            });
        }
        const proposal = await prisma.proposal.create({
            data: {
                ...validatedData,
                studentId: req.user.id, // Assuming user is attached by auth middleware
                status: 'PENDING',
                description: validatedData.abstract, // or another appropriate value
            },
        });
        res.status(201).json({
            message: 'Proposta criada com sucesso!',
            proposal,
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: 'Dados inválidos',
                errors: error.errors,
            });
        }
        console.error('Error creating proposal:', error);
        res.status(500).json({
            message: 'Erro interno do servidor',
        });
    }
};
export const getProposals = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, search } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const where = {};
        if (status) {
            where.status = status;
        }
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { author: { contains: search, mode: 'insensitive' } },
                { advisor: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [proposals, total] = await Promise.all([
            prisma.proposal.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    student: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            }),
            prisma.proposal.count({ where }),
        ]);
        res.json({
            proposals,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit)),
            },
        });
    }
    catch (error) {
        console.error('Error fetching proposals:', error);
        res.status(500).json({
            message: 'Erro interno do servidor',
        });
    }
};
export const getProposalById = async (req, res) => {
    try {
        const { id } = req.params;
        const proposal = await prisma.proposal.findUnique({
            where: { id: id },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!proposal) {
            return res.status(404).json({
                message: 'Proposta não encontrada',
            });
        }
        res.json(proposal);
    }
    catch (error) {
        console.error('Error fetching proposal:', error);
        res.status(500).json({
            message: 'Erro interno do servidor',
        });
    }
};
export const updateProposal = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = updateProposalSchema.parse(req.body);
        // Check if proposal exists
        const existingProposal = await prisma.proposal.findUnique({
            where: { id: id },
        });
        if (!existingProposal) {
            return res.status(404).json({
                message: 'Proposta não encontrada',
            });
        }
        // Students can only update their own proposals if status is PENDING or REVISION
        if (!req.user) {
            return res.status(401).json({
                message: 'Usuário não autenticado',
            });
        }
        if (req.user.role === 'STUDENT' && existingProposal.studentId !== req.user.id) {
            return res.status(403).json({
                message: 'Você só pode editar suas próprias propostas',
            });
        }
        // Students cannot change status
        if (req.user.role === 'STUDENT' && validatedData.status) {
            delete validatedData.status;
            delete validatedData.feedback;
        }
        // Transform validatedData to match Prisma's update input format
        const data = {};
        if (validatedData.title !== undefined)
            data.title = { set: validatedData.title };
        if (validatedData.author !== undefined)
            data.author = { set: validatedData.author };
        if (validatedData.advisor !== undefined)
            data.advisor = { set: validatedData.advisor };
        if (validatedData.abstract !== undefined)
            data.abstract = { set: validatedData.abstract };
        if (validatedData.keywords !== undefined)
            data.keywords = { set: validatedData.keywords };
        if (validatedData.status !== undefined)
            data.status = validatedData.status;
        if (validatedData.feedback !== undefined)
            data.feedback = { set: validatedData.feedback };
        const proposal = await prisma.proposal.update({
            where: { id: id },
            data,
        });
        res.json({
            message: 'Proposta atualizada com sucesso!',
            proposal,
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: 'Dados inválidos',
                errors: error.errors,
            });
        }
        console.error('Error updating proposal:', error);
        res.status(500).json({
            message: 'Erro interno do servidor',
        });
    }
};
export const deleteProposal = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: 'ID da proposta é obrigatório',
            });
        }
        // Check if proposal exists
        const existingProposal = await prisma.proposal.findUnique({
            where: { id },
        });
        if (!existingProposal) {
            return res.status(404).json({
                message: 'Proposta não encontrada',
            });
        }
        // Students can only delete their own proposals
        if (!req.user) {
            return res.status(401).json({
                message: 'Usuário não autenticado',
            });
        }
        if (req.user.role === 'STUDENT' && existingProposal.studentId !== req.user.id) {
            return res.status(403).json({
                message: 'Você só pode excluir suas próprias propostas',
            });
        }
        await prisma.proposal.delete({
            where: { id },
        });
        res.json({
            message: 'Proposta excluída com sucesso!',
        });
    }
    catch (error) {
        console.error('Error deleting proposal:', error);
        res.status(500).json({
            message: 'Erro interno do servidor',
        });
    }
};
export const getMyProposals = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: 'Usuário não autenticado',
            });
        }
        const { page = 1, limit = 10, status } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        const where = { studentId: req.user.id };
        if (status) {
            where.status = status;
        }
        const [proposals, total] = await Promise.all([
            prisma.proposal.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.proposal.count({ where }),
        ]);
        res.json({
            proposals,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit)),
            },
        });
    }
    catch (error) {
        console.error('Error fetching user proposals:', error);
        res.status(500).json({
            message: 'Erro interno do servidor',
        });
    }
};
export const getOrientadorProposals = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);
        if (!req.user) {
            return res.status(401).json({
                message: 'Usuário não autenticado',
            });
        }
        const where = { advisor: { contains: req.user.name, mode: 'insensitive' } };
        if (status) {
            where.status = status;
        }
        const [proposals, total] = await Promise.all([
            prisma.proposal.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    student: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            }),
            prisma.proposal.count({ where }),
        ]);
        res.json({
            proposals,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit)),
            },
        });
    }
    catch (error) {
        console.error('Error fetching orientador proposals:', error);
        res.status(500).json({
            message: 'Erro interno do servidor',
        });
    }
};
//# sourceMappingURL=proposals.js.map