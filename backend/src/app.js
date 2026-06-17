const express = require("express");
const cors = require("cors");
const documentosRouter = require("./routes/documentos");
const validacaoRouter = require("./routes/validacao");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", documentosRouter);
app.use("/api", validacaoRouter);

// health
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

module.exports = app;
