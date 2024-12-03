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

    const saveHorario = model.createSesion(data);
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
    const result = await model.findAllAsistencia(id);
    if (result) return res.status(200).json(result);
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

export default controllers;
