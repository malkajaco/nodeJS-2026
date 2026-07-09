import dotenv from "dotenv";
dotenv.config();

import express from "express";
import productsRouter from "./src/routes/products.router.js";
import authRouter from "./src/routes/auth.router.js";
import { MESSAGES } from "./src/utils/constants.js";
import cors, { corsOptions } from "./src/cors.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send(MESSAGES.WELCOME);
});

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ mensaje: MESSAGES.ROUTE_NOT_FOUND });
});

export default app;
