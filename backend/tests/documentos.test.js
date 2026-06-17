const request = require("supertest");
const app = require("../src/app");

describe("GET /api/documentos/:cpf", () => {
  it("should return 404 for unknown cpf", async () => {
    const res = await request(app).get("/api/documentos/000.000.000-00");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("success", false);
  });

  it("should return IR documents for a known cpf", async () => {
    // use a cpf from colaboradores mock (first entry)
    const res = await request(app).get("/api/documentos/123.456.789-00");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(Array.isArray(res.body.documentos)).toBe(true);
    // expect at least one IR document
    const foundIR = res.body.documentos.some((d) => d.tipo === "IR");
    expect(foundIR).toBe(true);
  });

  it("should return BOLETO documents when tipo=BOLETO", async () => {
    const res = await request(app).get(
      "/api/documentos/123.456.789-00?tipo=BOLETO",
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.documentos.every((d) => d.tipo === "BOLETO")).toBe(true);
  });
});
