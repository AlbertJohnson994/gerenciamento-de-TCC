import app from "./app";
import { initializeAdmin } from "./firebase/config";

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Inicializar Firebase Admin
    initializeAdmin();
    console.log("✅ Firebase Admin inicializado");

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔥 Usando Firebase como banco de dados`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("🛑 Desligando servidor gracefully...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("🛑 Recebido sinal de término...");
  process.exit(0);
});

startServer();