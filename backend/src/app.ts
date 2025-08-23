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


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes (using default exports)
import userRoutes from './routes/users';
import proposalRoutes from './routes/proposals';
import { router as authRoutes } from './routes/auth';

// Import middleware
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/proposals', proposalRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;