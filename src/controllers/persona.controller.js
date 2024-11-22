import { RENIEC_API_KEY } from "../config/config.js";
import model from "../models/persona.model.js";
import modelAuth from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import axios from "axios";

const controllers = {};

controllers.findReniec = async (req, res) => {
  try {
    const dni = req.body.dni;
    console.log("DNI:", dni);

    // Validar formato del DNI
    if (!/^\d{8}$/.test(dni)) {
      return res.status(400).json({ error: "DNI inválido" });
    }

    const url = `https://api.perudevs.com/api/v1/dni/simple?document=${dni}&key=${RENIEC_API_KEY}`;

    // Hacer la solicitud GET
    const response = await axios.get(url);
    // Enviar la respuesta al cliente
    res.json(response.data);
  } catch (error) {
    console.error("Error al consumir la API:", error.message);

    // Manejar errores específicos de la API
    if (error.response) {
      console.log("Error en la respuesta:", error.response.data);
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.insertar = async (req, res) => {
  try {
    const data = req.body;
    console.log("Data:", data);
    console.log("Nro. de documento:", data.CorreoInstitucional);

    // Verificar que el nro_documento no está repetido
    const isValid = await model.validarDocumento(data.NumeroDocumento);
    if (!isValid)
      return res.status(409).json({ error: "Nro. de documento ya existe" });

    // Verificar que el email_institucional y correo_personal no están repetidos
    const isValidEmail = await model.validarCorreoInstitucional(
      data.CorreoInstitucional
    );
    if (!isValidEmail)
      return res.status(409).json({ error: "Correo institucional ya existe" });

    // Insertar en la base de datos
    const persona_id = await model.insertar(data);
    if (persona_id) {
      // Si se registra se procede a registrar en la tabla credenciale
      const password = await bcrypt.hash(data.NumeroDocumento, 10);
      console.log("Hashed password:", password);
      const saveCredencial = await modelAuth.insertUser({
        persona_id,
        password,
      });

      if (saveCredencial)
        return res.status(200).json({ message: "Registro completado" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error en el registro" });
  }
};

controllers.mostrar = async (req, res) => {
  try {
    const result = await model.mostrar(2);
    if (result) return res.status(200).json(result);
  } catch (error) {}
};

controllers.mostrarById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await model.mostrarById(id);
    if (result) return res.status(200).json(result);
  } catch (error) {}
};

controllers.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log("ID:", id);
    console.log("Data:", data);
    const result = await model.update(id, data);
    return res.status(200).json({ result: result });
    // if (result)
    // return res.status(200).json({ message: "Registro actualizado" });
  } catch (error) {}
};

export default controllers;
