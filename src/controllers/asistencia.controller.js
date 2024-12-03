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

export default controllers;
