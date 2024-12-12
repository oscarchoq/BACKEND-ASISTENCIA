import { verificarUbicacion } from "../libs/gps.js";
import { generarCodigoOTP } from "../libs/randomCode.js";
import model from "../models/asistencia.model.js";

const controllers = {};

controllers.mostrar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await model.findAll(id);
    if (result) return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.createSesion = async (req, res) => {
  try {
    const data = req.body;
    // console.log("create asesion", data);
    const CodigoSesion = generarCodigoOTP();
    const saveHorario = model.createSesion(data, CodigoSesion);
    if (saveHorario)
      return res.status(200).json({ message: "Registro completado" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.updateSesion = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await model.updateSesion(id, data);
    return res.status(200).json({ result: result });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.mostrarAsistencia = async (req, res) => {
  try {
    const { id } = req.params;
    const asis = await model.findSesionOne(id);
    // console.log("controller", asis);
    const result = await model.findAllAsistencia(id);
    // console.log("asistencia result", result);
    return res
      .status(200)
      .json({ CodigoSesion: asis[0].CodigoSesion, estudiantes: result });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.marcarAsistencia = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // console.log("Debo marcar para id", id);
    // console.log("para estos estudiantes", data);

    // Iterar sobre cada asistencia y usar el modelo para actualizar
    const updates = data.map(
      ({ AsistenciaID, EstadoAsistencia, Observacion }) => {
        return model.updateEstadoAsistencia(
          AsistenciaID,
          EstadoAsistencia,
          Observacion
        );
      }
    );
    // / Esperar a que todas las actualizaciones se completen
    await Promise.all(updates);

    res.status(200).json({ message: "Cambios registrados" });
    // const result = await model.updateSesion(id, data);
    // return res.status(200).json({ result: result });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.marcarAsistenciaGeo = async (req, res) => {
  try {
    const { id } = req.params;
    const { PersonaID, TipoPersonaID } = req.user;
    const data = req.body;

    // console.log("clase ID", id);
    // console.log("persona ID", PersonaID);
    // console.log("tipo persona ID", TipoPersonaID);
    // console.log("DATA QUE LLEGA", data);

    const codeFound = await model.findOneSesionCode(id, data.CodigoSesion);
    // console.log("codigo found", codeFound);

    if (!codeFound) {
      return res.status(404).json({ error: "Código de asistencia inválido" });
    }

    // console.log("codefound", codeFound[0].SesionID);
    // ESTABLECER ESTADO DE ASISTENCIA
    // ESTABLECER ESTADO DE ASISTENCIA
    // const newEstado = 1;

    // Determinar el estado de asistencia basado en la tolerancia
    const sesion = codeFound[0]; // Sesión obtenida de la base de datos
    const ahora = new Date(); // Hora actual
    const horaInicio = new Date(`${sesion.FechaSesion}T${sesion.HoraInicio}`);
    // console.log("Ahora", ahora);
    // console.log("Hora inicio", horaInicio);
    // console.log("LLEGA mili", horaInicio.getTime());
    let newEstado = 1; // Por defecto: Asistió a tiempo

    if (sesion.Tolerancia !== null) {
      // console.log(sesion.Tolerancia);
      const toleranciaMs = parseInt(sesion.Tolerancia) * 60 * 1000; // Convertir minutos a milisegundos
      const horaLimite = new Date(horaInicio.getTime() + toleranciaMs);
      // console.log("Hora limite", horaLimite);

      if (ahora > horaInicio && ahora <= horaLimite) {
        // console.log("temprano");
        newEstado = 1; // Asistencia tardía
      } else {
        // console.log("tarde?");
        newEstado = 2; // Asistencia tardía
      }
    }
    // console.log("ESTADO", newEstado);
    // ESTABLECER ESTADO DE ASISTENCIA

    const Latitud = data.Latitud;
    const Longitud = data.Longitud;

    // console.log("Latitud", Latitud);
    // console.log("Longitud", Longitud);

    // const isValidGPS = verificarUbicacion(Latitud, Longitud);
    const isValidGPS = true;

    // console.log("es valido? ", isValidGPS);
    if (isValidGPS) {
      const marcado = await model.marcarEstadoAsistencia(
        PersonaID,
        codeFound[0].SesionID,
        newEstado,
        Latitud,
        Longitud
      );
      // console.log("marcado found", marcado);
      res.status(200).json({ message: "Registrado" });
    } else {
      // Error: No esta dentro del rango permitido
      res
        .status(400)
        .json({ error: "No se encuentra dentro del rango permitido" });
    }
    // const result = await model.updateSesion(id, data);
    // return res.status(200).json({ result: result });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.mostrarAsistenciaGeo = async (req, res) => {
  try {
    const { id } = req.params;
    const { PersonaID, TipoPersonaID } = req.user;

    // console.log("id", id);
    // console.log("persona ID", PersonaID);
    // console.log("tipo persona ID", TipoPersonaID);

    // const result = await model.findAllAsistencia(id);
    const result = await model.findAsistEst(id, PersonaID);
    if (result) return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default controllers;
