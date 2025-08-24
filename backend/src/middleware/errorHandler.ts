import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

// Firebase error codes reference: https://firebase.google.com/docs/reference/js/auth#autherrorcodes
const FIREBASE_ERRORS: { [key: string]: { status: number; message: string } } = {
  // Authentication errors
  'auth/invalid-email': { status: 400, message: 'Email inválido' },
  'auth/user-disabled': { status: 403, message: 'Usuário desativado' },
  'auth/user-not-found': { status: 404, message: 'Usuário não encontrado' },
  'auth/wrong-password': { status: 401, message: 'Senha incorreta' },
  'auth/email-already-in-use': { status: 409, message: 'Email já está em uso' },
  'auth/weak-password': { status: 400, message: 'Senha muito fraca' },
  'auth/operation-not-allowed': { status: 403, message: 'Operação não permitida' },
  'auth/too-many-requests': { status: 429, message: 'Muitas tentativas. Tente novamente mais tarde.' },
  
  // Firestore errors
  'permission-denied': { status: 403, message: 'Permissão negada' },
  'not-found': { status: 404, message: 'Documento não encontrado' },
  'already-exists': { status: 409, message: 'Documento já existe' },
  'invalid-argument': { status: 400, message: 'Argumento inválido' },
  'deadline-exceeded': { status: 408, message: 'Tempo limite excedido' },
  'resource-exhausted': { status: 429, message: 'Recursos esgotados' },
  'failed-precondition': { status: 400, message: 'Pré-condição falhou' },
  'aborted': { status: 409, message: 'Operação abortada' },
  'out-of-range': { status: 400, message: 'Fora do intervalo' },
  'unimplemented': { status: 501, message: 'Não implementado' },
  'internal': { status: 500, message: 'Erro interno' },
  'unavailable': { status: 503, message: 'Serviço indisponível' },
  'data-loss': { status: 500, message: 'Perda de dados' },
  'unauthenticated': { status: 401, message: 'Não autenticado' },
};

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Erro interno do servidor';
  let details: any = null;

  // Handle Firebase errors
  if (err.code && FIREBASE_ERRORS[err.code]) {
    const firebaseError = FIREBASE_ERRORS[err.code];
    statusCode = firebaseError.status;
    message = firebaseError.message;
    details = { code: err.code };
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Dados de entrada inválidos';
    details = {
      errors: err.errors.map(error => ({
        field: error.path.join('.'),
        message: error.message
      }))
    };
  }

  // Handle JSON parse errors
  if (err instanceof SyntaxError && 'body' in err) {
    statusCode = 400;
    message = 'JSON inválido';
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token inválido';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expirado';
  }

  // Handle custom application errors
  if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Development vs production error response
  const errorResponse: any = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      originalError: err.message
    })
  };

  // Add details if available
  if (details) {
    errorResponse.details = details;
  }

  res.status(statusCode).json(errorResponse);
};

export const asyncHandler = (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Rota não encontrada - ${req.originalUrl}`) as CustomError;
  error.statusCode = 404;
  next(error);
};