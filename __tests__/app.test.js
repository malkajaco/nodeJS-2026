import request from "supertest";
import app from "../app.js";

describe("GET /", () => {
test("espero que responda un status 200 y un mensaje", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);
  expect(response.body).toBe("Bienvenido a la API de productos");
});
})