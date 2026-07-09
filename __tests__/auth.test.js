import request from "supertest";
import app from "../app.js";

describe("POST /api/auth/login", () => {
  test("debe responder 400 si no se envian credenciales", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@email.com" });
    expect(response.status).toBe(400);
    expect(response.body.mensaje).toBe("Faltan credenciales");
  });

  test("debe responder 401 si las credenciales son incorrectas", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@example.com",
        password: "password123"
      });
    expect(response.status).toBe(401);
    expect(response.body.mensaje).toBe("Credenciales inválidas");
  });

  test("debe responder 200 y devolver un token si las credenciales son correctas", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "user@email.com",
      password: "strongPass123",
    });

    expect(response.status).toBe(200);
    expect(response.body.mensaje).toBe("Login exitoso");
    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe("string");
  });
});
