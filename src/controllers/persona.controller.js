import { RENIEC_API_KEY } from "../config/config.js";
import model from "../models/persona.model.js";
import modelAuth from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import axios from "axios";

const controllers = {};

controllers.findReniec = async (req, res) => {
  try {
    const dni = req.body.dni;
    // console.log("DNI:", dni);

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
    // console.log("Data:", data);
    // console.log("Nro. de documento:", data.NumeroDocumento);

    // Verificar que el nro_documento no está repetido
    const isValidDoc = await model.validarDocumento(data.NumeroDocumento, 0);
    if (!isValidDoc)
      return res.status(409).json({ error: "Nro. de documento ya existe" });

    // Verificar que el codigo no esta registrado
    if (data.TipoPersonaID === 2) {
      const isValidCodigo = await model.validarCodigo(data.Codigo, 0);
      if (!isValidCodigo)
        return res.status(409).json({ error: "Código ya existe" });
    }

    // Verificar que el email_institucional  no están repetidos
    if (data.CorreoInstitucional !== "") {
      const isValidEmail = await model.validarCorreoInstitucional(
        data.CorreoInstitucional,
        0
      );
      if (!isValidEmail)
        return res
          .status(409)
          .json({ error: "Correo institucional ya existe" });
    }

    // Insertar en la base de datos
    const persona_id = await model.insertar(data);
    if (persona_id) {
      // Si se registra se procede a registrar en la tabla credenciale
      const password = await bcrypt.hash(data.NumeroDocumento, 10);
      // console.log("Hashed password:", password);
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
    // 2 es ESTUDIANTES, 3 es DOCENTES
    const typePerson = req.typePerson;
    // console.log(typePerson);
    const result = await model.findAll(typePerson);
    if (result) return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener registros" });
  }
};

controllers.mostrarById = async (req, res) => {
  try {
    const { id } = req.params;
    const typePerson = req.typePerson;
    // console.log(typePerson);
    const result = await model.findById(id, typePerson);
    // console.log("usuario => ", result);
    if (result) return res.status(200).json(result);
    else return res.status(404).json({ message: "Registro no encontrado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener registro" });
  }
};

controllers.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // console.log("ID:", id);
    // console.log("Data:", data);

    // Verificar que el nro_documento no está repetido
    // console.log("Nro. de documento:", data.NumeroDocumento);
    const isValidDoc = await model.validarDocumento(data.NumeroDocumento, id);
    if (!isValidDoc)
      return res.status(409).json({ error: "Nro. de documento ya existe" });

    // Verificar que el codigo no esta registrado
    // console.log("Codigo:", data.Codigo, id);
    const isValidCodigo = await model.validarCodigo(data.Codigo, id);
    if (!isValidCodigo)
      return res.status(409).json({ error: "Código ya existe" });

    // Verificar que el email_institucional  no están repetidos
    // console.log("Email institucional:", data.CorreoInstitucional);
    if (data.CorreoInstitucional !== "") {
      const isValidEmail = await model.validarCorreoInstitucional(
        data.CorreoInstitucional,
        id
      );
      if (!isValidEmail)
        return res
          .status(409)
          .json({ error: "Correo institucional ya existe" });
    }

    const result = await model.update(id, data);
    return res.status(200).json({ result: result });
    // if (result)
    // return res.status(200).json({ message: "Registro actualizado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el registro" });
  }
};

controllers.changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { Activo } = req.body;

    // console.log("ID => ", id);
    // console.log("data => ", Activo);
    const newStatus = Activo === 0 ? 1 : 0;
    const response = await model.changeStatus(id, newStatus);
    return res.status(200).json({ message: "Estado actualizado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al cambiar el estado" });
  }
};

export default controllers;
