import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

//Configuracion de CORS
//origin: true permite peticiones desde cualquier origen
const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  //Permitir envio de cookies/credenciales
  credentials: true,
};

export default cors;
export { corsOptions };
