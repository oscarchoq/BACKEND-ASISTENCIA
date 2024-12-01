const controllers = {};
import model from "../models/combo.model.js";

controllers.gradoInstruccion = async (req, res) => {
  try {
    const comboFound = await model.findGradoInstruccion();
    return res.status(200).json(comboFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controllers.tipoDocumento = async (req, res) => {
  try {
    const comboFound = await model.findTipoDocumento();
    return res.status(200).json(comboFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controllers.estadoCivil = async (req, res) => {
  try {
    const comboFound = await model.findEstadoCivil();
    return res.status(200).json(comboFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controllers.periodo = async (req, res) => {
  try {
    const comboFound = await model.findPeriodo();
    return res.status(200).json(comboFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default controllers;
