const express = require("express");
const router = express.Router();
const colaboradores = require("../data/colaboradores");

// POST /api/validar-colaborador
router.post("/validar-colaborador", (req, res) => {
  const { matricula, cpf, dataNascimento, dataAdmissao } = req.body;

  // Validar se todos os campos foram fornecidos
  if (!matricula || !cpf || !dataNascimento || !dataAdmissao) {
    return res.status(400).json({
      success: false,
      message:
        "Campos obrigatórios faltando: matricula, cpf, dataNascimento, dataAdmissao",
    });
  }

  // Normalizar CPF removendo caracteres especiais
  const cpfNormalizado = cpf.replace(/\D/g, "");

  // Procurar o colaborador nos dados mockados
  const colaborador = colaboradores.find((col) => {
    const colCpfNormalizado = col.cpf.replace(/\D/g, "");
    return (
      col.matricula === matricula &&
      colCpfNormalizado === cpfNormalizado &&
      col.dataNascimento === dataNascimento &&
      col.dataAdmissao === dataAdmissao
    );
  });

  if (colaborador) {
    return res.status(200).json({
      success: true,
      message: "Colaborador validado com sucesso.",
      colaborador: {
        nome: colaborador.nome,
        cpf: colaborador.cpf,
      },
    });
  }

  res.status(404).json({
    success: false,
    message: "Pessoa não localizada.",
  });
});

module.exports = router;
