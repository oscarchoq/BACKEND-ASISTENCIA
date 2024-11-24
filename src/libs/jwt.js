import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

export function createAcessToken(payload) {
  console.log("Creando token", payload);
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "6h" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
