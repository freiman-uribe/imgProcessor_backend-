import jwt from "jsonwebtoken";
require("dotenv").config();

const secret = process.env.JWT_SECRET;

export function generateToken(payload: object, expiresIn: string | number = "1h"): string {
  return jwt.sign(payload, `${secret}`, { expiresIn });
}

export function verifyToken(token: string): jwt.JwtPayload | string {
  return jwt.verify(token, `${secret}`);
}
