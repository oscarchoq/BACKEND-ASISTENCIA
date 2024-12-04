import crypto from "crypto";
export function generarCodigoUnico(tam = 6) {
  return crypto
    .randomBytes(tam)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "") // Elimina caracteres no deseados
    .toLowerCase() // Convierte todo a minúsculas
    .substring(0, tam); // Ajusta longitud
}

export function generarCodigoOTP(tam = 6) {
  return Math.floor(100000 + Math.random() * 900000);
}
