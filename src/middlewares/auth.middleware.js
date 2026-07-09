import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { MESSAGES } from "../utils/constants.js";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: MESSAGES.AUTH_TOKEN_NOT_SENT });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: MESSAGES.AUTH_INVALID_TOKEN_FORMAT });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ mensaje: MESSAGES.AUTH_INVALID_OR_EXPIRED_TOKEN });
  }
};