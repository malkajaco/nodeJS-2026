import { generateToken } from "../utils/token.generator.js";

const default_user = {
  id: 1,
  name: "User",
  email: "user@email.com",
  password: "strongPass123",
  admin: true,
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Faltan credenciales",
    });
  }

  if (email !== default_user.email || password !== default_user.password) {
    return res.status(401).json({
      message: "Credenciales inválidas",
    });
  }

  const token = generateToken(default_user);

  res.json({
    message: "Login exitoso",
    token,
  });
};