import express from "express";
import cors from "cors";

const app = express();

//Configuracion basica: Permitir todos los origenes
app.use(cors());

//Configuracion avanzada: Permitir solo ciertos origenes
const corsOptions = {
  //Dominios permitidos
  origin: ["http://localhost:3000", "http://example.com"],
  //Metodos permitidos
  methods: ["GET", "POST"],
  //Encabezados permitidos
  allowedHeaders: ["Content-Type", "Authorization"],
  //Permitir cookies o credenciales
  credentials: true,
};

app.use(cors(corsOptions));
