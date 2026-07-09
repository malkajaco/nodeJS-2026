import request from "supertest";
import app from "../app.js";

describe("GET /", () => {
  test("debe responder 200 con mensaje de bienvenida", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Bienvenido a la API de productos");
  });
});

describe("Rutas no encontradas", () => {
  test("debe responder 404 para rutas inexistentes", async () => {
    const response = await request(app).get("/ruta-inexistente");
    expect(response.status).toBe(404);
    expect(response.body.mensaje).toBe("Ruta no encontrada");
  });
});
