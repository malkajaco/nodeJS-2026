import request from "supertest";
import app from "../index.js";

describe("POST /api/auth/login", () => {
  test("espero que responda 401 si las credenciales son incorrectas", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@example.com",
        password: "password123"
      });
    expect(response.status).toBe(401);
  });
});

describe("POST /api/auth/login", () => {
  test("debe responder 200 y devolver un token si las credenciales son correctas", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "user@email.com",
      password: "strongPass123",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});