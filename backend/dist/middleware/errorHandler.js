import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Erro interno do servidor';
    let details = null;
    // Handle Prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                statusCode = 409;
                message = 'Registro já existe';
                details = { target: err.meta?.target };
                break;
            case 'P2025':
                statusCode = 404;
                message = 'Registro não encontrado';
                break;
            case 'P2003':
                statusCode = 400;
                message = 'Violação de chave estrangeira';
                details = { field: err.meta?.field_name };
                break;
            default:
                statusCode = 400;
                message = 'Erro de banco de dados';
                details = { code: err.code };
        }
    }
    // Handle Prisma validation errors
    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = 'Dados inválidos para o banco de dados';
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
    const errorResponse = {
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
// Optional: Async error wrapper middleware
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// Optional: 404 handler middleware
export const notFoundHandler = (req, res, next) => {
    const error = new Error(`Rota não encontrada - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};
//# sourceMappingURL=errorHandler.js.map