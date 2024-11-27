import model from "../models/curso.model.js";

const controllers = {};

controllers.mostrar = async (req, res) => {
  try {
    // http://localhost:3000/api/v1/academico/curso?semestre=8&&search=web
    console.log("curso");
    const semestreID = req.query.semestre ? parseInt(req.query.semestre) : null;
    const search = req.query.search ? req.query.search : "";
    console.log(semestreID);
    console.log(search);
    const result = await model.findAll(semestreID, search);
    if (result) return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default controllers;
