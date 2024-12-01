import model from "../models/periodo.model.js";

const controllers = {};

controllers.mostrar = async (req, res) => {
  try {
    const result = await model.findAll();
    if (result) return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.insertar = async (req, res) => {
  try {
    const data = req.body;

    // VALIDAR PERIODO EXISTENTE
    const isValid = await model.validarPeriodo(data.Anio, data.Ciclo, 0);
    if (!isValid) return res.status(409).json({ error: "Periodo ya existe" });

    const savePeriodo = await model.save(data);
    // console.log("result => ", savePeriodo);
    if (savePeriodo)
      return res.status(200).json({ message: "Registro completado" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.mostrarById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await model.findById(id);
    if (result) return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // VALIDAR PERIODO EXISTENTE
    const isValid = await model.validarPeriodo(data.Anio, data.Ciclo, id);
    if (!isValid) return res.status(409).json({ error: "Periodo ya existe" });

    const result = await model.update(id, data);
    return res.status(200).json({ result: result });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { Activo } = req.body;

    const newStatus = Activo === 0 ? 1 : 0;
    const response = await model.changeStatus(id, newStatus);
    return res.status(200).json({ message: "Estado actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default controllers;
