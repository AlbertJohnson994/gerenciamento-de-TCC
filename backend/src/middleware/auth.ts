import { Request, Response, NextFunction } from 'express';
import { auth } from '../firebase/config';
import { User } from '../types/firebase';
import { FirebaseService } from '../services/firebaseService';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Token de acesso não fornecido',
      });
    }

    const token = authHeader.substring(7);
    
    // Verificar token no Firebase Auth
    // Esta é uma implementação simplificada
    // Em produção, use Firebase Admin para verificar o token
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      return res.status(401).json({
        message: 'Token inválido ou expirado',
      });
    }

    // Buscar dados do usuário no Firestore
    const userDoc = await FirebaseService.getUserByEmail(currentUser.email!);
    
    if (!userDoc) {
      return res.status(401).json({
        message: 'Usuário não encontrado',
      });
    }

    req.user = userDoc;
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    res.status(401).json({
      message: 'Falha na autenticação',
    });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Não autenticado',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Acesso negado. Permissões insuficientes.',
      });
    }

    next();
  };
};