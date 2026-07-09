import request from "supertest";
import app from "../app.js";

let token;
let productId;

const validProduct = {
  codigo: "TST-001",
  producto: "Producto de prueba",
  categoria: "Test",
  proveedor: "Proveedor test",
  costo: 500,
  precio_unitario: 1000,
  descripcion_corta: "Producto creado en tests",
  stock: 0,
};

beforeAll(async () => {
  const loginResponse = await request(app).post("/api/auth/login").send({
    email: "user@email.com",
    password: "strongPass123",
  });
  token = loginResponse.body.token;
});

describe("GET /api/products", () => {
  test("debe devolver un array", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /api/products - Validaciones de campos", () => {
  test("debe responder 401 sin token", async () => {
    const response = await request(app)
      .post("/api/products")
      .send(validProduct);
    expect(response.status).toBe(401);
  });

  const camposRequeridos = ["codigo", "producto", "categoria", "proveedor", "costo", "precio_unitario"];

  test.each(camposRequeridos)("debe responder 400 si no se envía el campo %s", async (campo) => {
    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...validProduct, [campo]: undefined });
    expect(response.status).toBe(400);
    expect(response.body.mensaje).toContain(campo);
  });

  test("debe responder 400 si el codigo no tiene formato XXX-999", async () => {
    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...validProduct, codigo: "invalido" });
    expect(response.status).toBe(400);
    expect(response.body.mensaje).toContain("formato");
  });

  const camposNumericos = [
    { campo: "costo", valor: "no-es-un-numero" },
    { campo: "costo", valor: -1 },
    { campo: "precio_unitario", valor: "mil" },
    { campo: "precio_unitario", valor: 100.123 },
  ];

  test.each(camposNumericos)("debe responder 400 si $campo tiene valor inválido: $valor", async ({ campo, valor }) => {
    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...validProduct, [campo]: valor });
    expect(response.status).toBe(400);
    expect(response.body.mensaje).toContain(campo);
  });
});

describe("Flujo completo: crear, consultar, modificar stock, eliminar", () => {
  test("POST debe crear el producto y responder 201", async () => {
    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(validProduct);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.stock).toBe(0);

    productId = response.body.id;
  });

  test("GET /:id debe devolver el producto creado", async () => {
    const response = await request(app).get(`/api/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(productId);
    expect(response.body.producto).toBe(validProduct.producto);
  });

  test("PATCH stock debe sumar con valor positivo", async () => {
    const response = await request(app)
      .patch(`/api/products/${productId}/stock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ valor: 10 });

    expect(response.status).toBe(200);
    expect(response.body.stock).toBe(10);
  });

  test("PATCH stock debe restar con valor negativo", async () => {
    const response = await request(app)
      .patch(`/api/products/${productId}/stock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ valor: -3 });

    expect(response.status).toBe(200);
    expect(response.body.stock).toBe(7);
  });

  test("PATCH stock debe incluir advertencia si queda en 0", async () => {
    const response = await request(app)
      .patch(`/api/products/${productId}/stock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ valor: -7 });

    expect(response.status).toBe(200);
    expect(response.body.stock).toBe(0);
    expect(response.body.advertencia).toContain("no tiene stock");
  });

  test("PATCH stock debe incluir advertencia si queda negativo", async () => {
    const response = await request(app)
      .patch(`/api/products/${productId}/stock`)
      .set("Authorization", `Bearer ${token}`)
      .send({ valor: -5 });

    expect(response.status).toBe(200);
    expect(response.body.stock).toBe(-5);
    expect(response.body.advertencia).toBeDefined();
  });

  test("DELETE debe eliminar el producto y responder 200", async () => {
    const response = await request(app)
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.mensaje).toBe("Producto eliminado");
  });

  test("GET /:id del producto eliminado debe responder 404", async () => {
    const response = await request(app).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
  });
});

describe("PATCH /api/products/:id/stock - Validaciones", () => {
  test("debe responder 401 sin token", async () => {
    const response = await request(app)
      .patch(`/api/products/${productId}/stock`)
      .send({ valor: 5 });
    expect(response.status).toBe(401);
  });

  test("debe responder 400 si valor no es un numero", async () => {
    const response = await request(app)
      .patch("/api/products/id-inexistente/stock")
      .set("Authorization", `Bearer ${token}`)
      .send({ valor: "no-numero" });
    expect(response.status).toBe(400);
  });

  test("debe responder 404 si el producto no existe", async () => {
    const response = await request(app)
      .patch("/api/products/id-inexistente/stock")
      .set("Authorization", `Bearer ${token}`)
      .send({ valor: 5 });
    expect(response.status).toBe(404);
  });
});

describe("DELETE /api/products/:id - Validaciones", () => {
  test("debe responder 401 sin token", async () => {
    const response = await request(app).delete(`/api/products/${productId}`);
    expect(response.status).toBe(401);
  });

  test("debe responder 404 si el producto no existe", async () => {
    const response = await request(app)
      .delete("/api/products/id-inexistente")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
});

describe("POST /api/products/seed", () => {
  test("debe responder 401 sin token", async () => {
    const response = await request(app).post("/api/products/seed");
    expect(response.status).toBe(401);
  });

  test("debe insertar productos y responder 201", async () => {
    const response = await request(app)
      .post("/api/products/seed")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.mensaje).toContain("productos insertados");
  });
});

describe("GET /api/products/:id", () => {
  test("debe devolver 404 si el producto no existe", async () => {
    const response = await request(app).get("/api/products/id-inexistente");
    expect(response.status).toBe(404);
    expect(response.body.mensaje).toBe("Producto no encontrado");
  });
});
