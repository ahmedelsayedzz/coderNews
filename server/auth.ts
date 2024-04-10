import { jwtObject } from "./types";
import jwt from "jsonwebtoken";
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log("Missing JWT secret");
    process.exit(1);
  }
  return secret;
}
export function signJwt(obj: jwtObject) {
  return jwt.sign(obj, getJwtSecret(), {
    expiresIn: "1d",
  });
}
export function verifyJwt(token: string): jwtObject {
  return jwt.verify(token, getJwtSecret()) as jwtObject;
}
