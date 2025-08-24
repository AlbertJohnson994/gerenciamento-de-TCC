// import express from "express";
// import cors from "cors";
// import authRoutes from './routes/auth';
// import userRoutes from "./routes/users";
// import proposalRoutes from "./routes/proposals";
// import { errorHandler, notFoundHandler } from "../src/middleware/errorHandler";
// const app = express();
// // Middleware
// app.use(cors());
// app.use(express.json());
// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/proposals", proposalRoutes);
// // Health check
// app.get("/api/health", (req, res) => {
//   res.json({ status: "OK", timestamp: new Date().toISOString() });
// });
// // 404 handler (must be after all routes)
// app.use(notFoundHandler);
// // Error handling
// app.use(errorHandler);
// export default app;
// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import proposalRoutes from './routes/proposals';
// Import middleware
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Rota raiz
app.get('/', (req, res) => {
    res.json({
        message: 'Bem-vindo ao Sistema de Gerenciamento de TCC',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            proposals: '/api/proposals',
            health: '/api/health'
        }
    });
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/proposals', proposalRoutes);
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        message: 'Server is running!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});
// Error handling middleware (deve ser o último)
app.use(notFoundHandler);
app.use(errorHandler);
export default app; // ← Exportação padrão
//# sourceMappingURL=app.js.map