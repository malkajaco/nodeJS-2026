import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import productsRouter from "./src/routes/products.router.js";
import usersRouter from "./src/routes/users.router.js";
import categoriesRouter from "./src/routes/categories.router.js";
import authRouter from "./src/routes/auth.router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la API de productos");
});

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

export default app;
