import { Request, Response } from "express";
import { z } from "zod";
import { FirebaseService } from "../services/firebaseService";
import { AuthService } from "../services/authService";
import { User } from "../types/firebase";

// Validation schemas
const updateUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").optional(),
  email: z.string().email("Email inválido").optional(),
  role: z.enum(["STUDENT", "ORIENTADOR", "ADMIN", "COORDENADOR"]).optional(),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").optional(),
  matriculation: z.string().optional(),
  course: z.string().optional(),
});

const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  role: z.enum(["STUDENT", "ORIENTADOR", "ADMIN", "COORDENADOR"]),
  matriculation: z.string().optional(),
  course: z.string().optional(),
});

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { role, search } = req.query;

    let users: User[];

    if (role) {
      // Use optimized method for role filtering
      users = await FirebaseService.getUsersByRole(role as string);
    } else {
      // Get all users
      users = await FirebaseService.getAllUsers();
    }

    // Apply search filter if provided
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      users = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        (user.matriculation && user.matriculation.toLowerCase().includes(searchTerm)) ||
        (user.course && user.course.toLowerCase().includes(searchTerm))
      );
    }

    res.json({
      users,
      pagination: {
        page: 1,
        limit: users.length,
        total: users.length,
        pages: 1,
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

    const user = await FirebaseService.getUserById(id);

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
    const existingUser = await FirebaseService.getUserByEmail(validatedData.email);
    if (existingUser) {
      return res.status(409).json({
        message: "Usuário já existe com este email",
      });
    }

    // Use AuthService to create user (creates in both Auth and Firestore)
    const { user, token } = await AuthService.register(validatedData);

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user,
      token,
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
      message: error instanceof Error ? error.message : "Erro interno do servidor",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = updateUserSchema.parse(req.body);

    // Check if user exists
    const existingUser = await FirebaseService.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    // Users can only update their own profile unless they're ADMIN
    if (req.user?.role !== "ADMIN" && existingUser.id !== req.user?.id) {
      return res.status(403).json({
        message: "Você só pode editar seu próprio perfil",
      });
    }

    // Non-admin users cannot change their role
    if (req.user?.role !== "ADMIN" && validatedData.role) {
      delete validatedData.role;
    }

    await FirebaseService.updateUser(id, validatedData);

    // Get updated user data
    const updatedUser = await FirebaseService.getUserById(id);

    res.json({
      message: "Usuário atualizado com sucesso!",
      user: updatedUser,
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
      message: error instanceof Error ? error.message : "Erro interno do servidor",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await FirebaseService.getUserById(id);
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
    const userProposals = await FirebaseService.getProposals({ studentId: id });
    if (userProposals.length > 0) {
      return res.status(409).json({
        message: "Não é possível excluir usuário com propostas associadas",
      });
    }

    // Delete user from Firestore
    await FirebaseService.deleteUser(id);

    // Note: To delete from Firebase Auth, you need additional permissions
    // await deleteUserFromAuth(id); // This would require Firebase Admin setup

    res.json({
      message: "Usuário excluído com sucesso!",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Erro interno do servidor",
    });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    const user = await FirebaseService.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Erro interno do servidor",
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);

    if (!req.user) {
      return res.status(401).json({
        message: "Usuário não autenticado",
      });
    }

    // Remove role from update data for profile updates
    const { role, ...updateData } = validatedData;

    await FirebaseService.updateUser(req.user.id, updateData);

    // Get updated user data
    const updatedUser = await FirebaseService.getUserById(req.user.id);

    res.json({
      message: "Perfil atualizado com sucesso!",
      user: updatedUser,
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
      message: error instanceof Error ? error.message : "Erro interno do servidor",
    });
  }
};