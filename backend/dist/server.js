// src/server.ts
import app from "./app";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const startServer = async () => {
    try {
        // Testar conexão com o banco
        await prisma.$connect();
        console.log("✅ Conectado ao banco de dados");
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
        });
    }
    catch (error) {
        console.error("❌ Erro ao iniciar servidor:", error);
        process.exit(1);
    }
};
// Graceful shutdown
process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});
startServer();
//# sourceMappingURL=server.js.map