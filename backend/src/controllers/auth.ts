import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/authService';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

const registerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  role: z.enum(['STUDENT', 'ORIENTADOR', 'ADMIN', 'COORDENADOR']).default('STUDENT'),
  matriculation: z.string().optional(),
  course: z.string().optional(),
});

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const { user, token } = await AuthService.register(validatedData);

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user,
      token,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Dados inválidos',
        errors: error.errors,
      });
    }

    res.status(400).json({
      message: error.message || 'Erro no registro',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const { user, token } = await AuthService.login(
      validatedData.email,
      validatedData.password
    );

    res.json({
      message: 'Login realizado com sucesso!',
      user,
      token,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Dados inválidos',
        errors: error.errors,
      });
    }

    res.status(401).json({
      message: error.message || 'Credenciais inválidas',
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.getCurrentUser();
    
    if (!user) {
      return res.status(404).json({
        message: 'Usuário não encontrado',
      });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Erro ao buscar usuário',
    });
  }
};