const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const colaboradores = require("../data/colaboradores");

// Simular documentos disponíveis no storage
const documentosDisponiveis = {
  IR: {
    2024: true,
    2025: true,
  },
  BOLETO: {
    2025: true,
  },
};

// GET /api/documentos/:cpf?tipo=IR|BOLETO
router.get("/documentos/:cpf", (req, res) => {
  const { cpf } = req.params;
  const { tipo } = req.query;

  // Normalizar CPF removendo caracteres especiais
  const cpfNormalizado = cpf.replace(/\D/g, "");

  // Validar se o colaborador existe
  const colaborador = colaboradores.find((col) => {
    const colCpfNormalizado = col.cpf.replace(/\D/g, "");
    return colCpfNormalizado === cpfNormalizado;
  });

  if (!colaborador) {
    return res.status(404).json({
      success: false,
      message: "Documento não localizado.",
    });
  }

  // Gerar token temporário
  const gerarToken = () => {
    const expiracaoSegundos =
      parseInt(process.env.TOKEN_EXPIRATION_SECONDS) || 3600;
    const expiresAt = Math.floor(Date.now() / 1000) + expiracaoSegundos;
    return {
      token: uuidv4(),
      expires: expiresAt,
    };
  };

  // Montar resposta com documentos
  const documentos = [];

  if (!tipo || tipo === "IR") {
    // Adicionar documentos IR disponíveis
    Object.keys(documentosDisponiveis.IR).forEach((ano) => {
      if (documentosDisponiveis.IR[ano]) {
        const tokenData = gerarToken();
        documentos.push({
          nome: `Informe de Rendimentos ${ano}`,
          tipo: "IR",
          ano: ano,
          link: `http://localhost:${process.env.PORT || 3001}/storage/IR/${ano}/INF_${ano}_${cpfNormalizado}.pdf?token=${tokenData.token}&expires=${tokenData.expires}`,
        });
      }
    });
  }

  if (!tipo || tipo === "BOLETO") {
    // Adicionar documentos BOLETO disponíveis
    const tokenData = gerarToken();
    documentos.push({
      nome: "Boleto 01/2025",
      tipo: "BOLETO",
      ano: "2025",
      mes: "01",
      link: `http://localhost:${process.env.PORT || 3001}/storage/BOLETOS/2025/01/BLT_01_2025_${cpfNormalizado}.pdf?token=${tokenData.token}&expires=${tokenData.expires}`,
    });
  }

  if (documentos.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Documento não localizado.",
    });
  }

  res.status(200).json({
    success: true,
    documentos: documentos,
  });
});

module.exports = router;
