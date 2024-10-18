import model from "../models/persona.model.js";
import modelAuth from "../models/auth.model.js";
import bcrypt from "bcryptjs";

const controllers = {};
controllers.insertar = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data:", data);

    // Verificar que el nro_documento no está repetido
    // Verificar que el email_institucional y correo_personal no están repetidos

    // Insertar en la base de datos
    const persona_id = await model.insertar(data);
    if (persona_id) {
      // Si se registra se procede a registrar en la tabla credenciale
      // username: cod_matricula
      // password: nro_documento
      const password = await bcrypt.hash(data.nro_documento, 10);
      console.log("Hashed password:", password);
      const saveCredencial = await modelAuth.insertUser({
        username: data.cod_matricula,
        password,
        persona_id,
      });

      if (saveCredencial)
        return res.status(200).json({ message: "Registro completado" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el registro" });
  }
};

export default controllers;
