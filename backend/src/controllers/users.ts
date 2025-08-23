import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Validation schemas
const updateUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").optional(),
  email: z.string().email("Email inválido").optional(),
  role: z.enum(["STUDENT", "ORIENTADOR", "ADMIN"]).optional(),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .optional(),
});

const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  role: z.enum(["STUDENT", "ORIENTADOR", "ADMIN"]),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: "insensitive" } },
        { email: { contains: search as string, mode: "insensitive" } },
      ];
    }

    // Exclude password from results
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = createUserSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Usuário já existe com este email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.errors,
      });
    }

    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateUserSchema.parse(req.body);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: id as string },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    // Users can only update their own profile unless they're ADMIN
    if (
      !req.user ||
      (req.user.role !== "ADMIN" && existingUser.id !== req.user.id)
    ) {
      return res.status(403).json({
        message: "Você só pode editar seu próprio perfil",
      });
    }

    // Non-admin users cannot change their role
    if (req.user.role !== "ADMIN" && validatedData.role) {
      delete validatedData.role;
    }

    // Hash password if provided
    let updateData = { ...validatedData };
    if (validatedData.password) {
      updateData.password = await bcrypt.hash(validatedData.password, 12);
    }

    // Build Prisma update object with { set: value } only for defined fields
    const prismaUpdateData: any = {};
    if (typeof updateData.name !== "undefined") {
      prismaUpdateData.name = { set: updateData.name };
    }
    if (typeof updateData.email !== "undefined") {
      prismaUpdateData.email = { set: updateData.email };
    }
    if (typeof updateData.password !== "undefined") {
      prismaUpdateData.password = { set: updateData.password };
    }
    if (typeof updateData.role !== "undefined") {
      prismaUpdateData.role = { set: updateData.role };
    }

    const user = await prisma.user.update({
      where: { id: id as string },
      data: prismaUpdateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      message: "Usuário atualizado com sucesso!",
      user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.errors,
      });
    }

    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: id as string },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    // Prevent users from deleting themselves
    if (req.user && existingUser.id === req.user.id) {
      return res.status(403).json({
        message: "Você não pode excluir sua própria conta",
      });
    }

    // Check if user has associated proposals
    if (!id) {
      return res.status(400).json({
        message: "ID de usuário inválido",
      });
    }
    const userProposals = await prisma.proposal.count({
      where: { studentId: id as string },
    });

    if (userProposals > 0) {
      return res.status(409).json({
        message: "Não é possível excluir usuário com propostas associadas",
      });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.json({
      message: "Usuário excluído com sucesso!",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);

    // Remove role from update data for profile updates
    const { role, ...updateData } = validatedData;

    // Hash password if provided
    let finalUpdateData = { ...updateData };
    if (validatedData.password) {
      finalUpdateData.password = await bcrypt.hash(validatedData.password, 12);
    }

    // Build Prisma update object with { set: value } only for defined fields
    const prismaUpdateData: any = {};
    if (typeof finalUpdateData.name !== "undefined") {
      prismaUpdateData.name = { set: finalUpdateData.name };
    }
    if (typeof finalUpdateData.email !== "undefined") {
      prismaUpdateData.email = { set: finalUpdateData.email };
    }
    if (typeof finalUpdateData.password !== "undefined") {
      prismaUpdateData.password = { set: finalUpdateData.password };
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: prismaUpdateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      message: "Perfil atualizado com sucesso!",
      user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.errors,
      });
    }

    console.error("Error updating profile:", error);
    res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
};
