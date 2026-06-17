require("dotenv").config();
const path = require("path");

// If tests import app, use the exported app; otherwise create and listen
let app;
try {
  // prefer exported app if present
  app = require("./app");
} catch (e) {
  const express = require("express");
  const cors = require("cors");
  app = express();

  const PORT = process.env.PORT || 3001;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Servir arquivos estáticos da pasta storage
  app.use("/storage", express.static(path.join(__dirname, "../storage")));

  // Routes
  const validacaoRoutes = require("./routes/validacao");
  const documentosRoutes = require("./routes/documentos");

  app.use("/api", validacaoRoutes);
  app.use("/api", documentosRoutes);

  // Health check
  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      message: "Servidor funcionando corretamente",
    });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: "Rota não encontrada.",
    });
  });

  // Iniciar servidor
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`URL base da API: http://localhost:${PORT}/api`);
  });
}
