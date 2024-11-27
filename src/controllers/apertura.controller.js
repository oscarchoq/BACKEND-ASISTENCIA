import { generarCodigoUnico } from "../libs/randomCode.js";
import model from "../models/apertura.model.js";

const controllers = {};

controllers.insertar = async (req, res) => {
  try {
    const data = { ...req.body, DocenteID: "" };
    console.log("INS data apertura: ", data);

    const CodigoApertura = generarCodigoUnico();
    // FALTA VALIDAR CODIGO (POCO PROBABLE)

    console.log("INS codigoApertura: ", CodigoApertura);

    const saveApertura = await model.save(data, CodigoApertura);
    console.log("result => ", saveApertura);
    if (saveApertura)
      return res.status(200).json({ message: "Registro completado" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default controllers;
