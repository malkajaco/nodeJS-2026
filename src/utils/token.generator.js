import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export const generateToken = (userData) => {
  const payload = {
    id: userData.id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};