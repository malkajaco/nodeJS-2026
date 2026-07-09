import { generateToken } from "../utils/token.generator.js";
import { MESSAGES } from "../utils/constants.js";

const defaultUser = {
  id: 1,
  name: "User",
  email: "user@email.com",
  password: "strongPass123",
  admin: true,
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensaje: MESSAGES.AUTH_MISSING_CREDENTIALS });
  }

  const token = generateToken(defaultUser);

  if (email === defaultUser.email && password === defaultUser.password) {
    return res.status(200).json({ mensaje: MESSAGES.AUTH_LOGIN_SUCCESS, token });
  } else {
    return res.status(401).json({ mensaje: MESSAGES.AUTH_INVALID_CREDENTIALS });
  }
};
