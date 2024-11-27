import crypto from "crypto";
export function generarCodigoUnico(tam = 6) {
  return crypto
    .randomBytes(tam)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "") // Elimina caracteres no deseados
    .substring(0, tam); // Ajusta longitud
}

// console.log(generarCodigoUnico());
// console.log(generarCodigoUnico());
