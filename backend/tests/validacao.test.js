const request = require("supertest");
const app = require("../src/app");

describe("POST /api/validar-colaborador", () => {
  it("should return 400 when fields are missing", async () => {
    const res = await request(app).post("/api/validar-colaborador").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("success", false);
  });

  it("should validate a known collaborator", async () => {
    const payload = {
      matricula: "12345",
      cpf: "123.456.789-00",
      dataNascimento: "1990-01-15",
      dataAdmissao: "2015-03-01",
    };

    const res = await request(app)
      .post("/api/validar-colaborador")
      .send(payload);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("colaborador");
    expect(res.body.colaborador).toHaveProperty("nome");
  });

  it("should return 404 for non-matching data", async () => {
    const payload = {
      matricula: "00000",
      cpf: "000.000.000-00",
      dataNascimento: "2000-01-01",
      dataAdmissao: "2020-01-01",
    };
    const res = await request(app)
      .post("/api/validar-colaborador")
      .send(payload);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("success", false);
  });
});
