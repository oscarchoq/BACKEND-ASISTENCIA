import modelInscripcion from "../models/inscripcion.model.js";
import modelApertura from "../models/apertura.model.js";
import modelClase from "../models/clase.model.js";

const controllers = {};

controllers.inscribir = async (req, res) => {
  try {
    const { PersonaID, TipoPersonaID } = req.user;
    const { codigo } = req.body;

    if (TipoPersonaID !== 2) {
      return res
        .status(403)
        .json({ error: "Solo estudiantes pueden inscribirse" });
    }

    // VERIFICAR SI EXISTE CODIGO DE CLASE
    const clase = await modelApertura.findCode(codigo);
    if (!clase) {
      return res.status(404).json({ error: "Codigo no existe" });
    }

    // VERIFICAR SI EL USUARIO YA ESTA INSCRITO
    const inscrito = await modelInscripcion.findOne(
      clase.AperturaCursoID,
      PersonaID
    );
    let mensaje = "";
    switch (inscrito?.EstadoInscripcion) {
      case "ACEPTADO":
        mensaje = "Ya estás inscrito en este curso.";
        break;
      case "EN ESPERA":
        mensaje =
          "Tu inscripción está en espera de aprobación. Por favor, espera la confirmación.";
        break;
      case "RECHAZADO":
        mensaje =
          "Tu inscripción fue rechazada. Por favor, contacta con el administrador para más información.";
        break;
      default:
        mensaje = "Estado de inscripción desconocido.";
    }
    if (inscrito) {
      return res.status(200).json({ message: mensaje, estado: 0 });
    }
    const estado = clase?.AprobacionAutomatica === 1 ? "ACEPTADO" : "EN ESPERA";
    const create = await modelInscripcion.save(
      clase.AperturaCursoID,
      PersonaID,
      estado
    );
    mensaje =
      clase?.AprobacionAutomatica === 1
        ? "Inscripción completada"
        : "Pendiente de confirmación";
    return res.status(200).json({ message: mensaje, estado: 1 });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.UDPestadoInscripcion = async (req, res) => {
  try {
    const { InscripcionID, EstadoInscripcion } = req.body;
    const response = await modelInscripcion.update(
      InscripcionID,
      EstadoInscripcion
    );
    return res
      .status(200)
      .json({ message: "Estado de inscripcion actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.findAll = async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);
    const result = await modelClase.findAll(
      user?.TipoPersonaID,
      user?.PersonaID
    );
    if (result) return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.findOne = async (req, res) => {
  try {
    // console.log(user);
    const { id } = req.params;
    const result = await modelClase.findOne(id);
    if (result) return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.findHorarios = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await modelClase.findHorarios(id);
    // console.log("result de model ", result);
    if (result) return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.createHorario = async (req, res) => {
  try {
    const data = req.body;
    // VALIDAR QUE HORARIO NO EXISTA

    const saveHorario = await modelClase.createHorario(data);
    // console.log("result => ", saveHorario);
    if (saveHorario)
      return res.status(200).json({ message: "Registro completado" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.updateHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    // VALIDAR QUE HORARIO NO EXISTA

    const result = await modelClase.updateHorario(id, data);
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
    const response = await modelClase.changeStatusHorario(id, newStatus);
    return res.status(200).json({ message: "Estado actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.mostrarInscritos = async (req, res) => {
  try {
    // http://localhost:3000/api/v1/clases/2/inscritos?estado=8&&search=web
    // console.log("curso");
    const { id } = req.params;
    console.log("estado a buscar", req.query.estado);

    // const estado = req.query.estado ? String(req.query.estado) : null;
    const estado = req.query.estado ? String(req.query.estado) : null;
    const search = req.query.search ? req.query.search : "";
    console.log("mm", estado);
    // console.log(search);
    const result = await modelClase.findInscritos(id, estado, search);
    if (result) return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.changeStatusInscripcion = async (req, res) => {
  try {
    const { id } = req.params;
    const { EstadoInscripcion } = req.body;

    const response = await modelClase.changeStatusInscripcion(
      id,
      EstadoInscripcion
    );
    return res.status(200).json({ message: "Estado actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

controllers.changeStatusClase = async (req, res) => {
  try {
    const { id } = req.params;
    const { AprobacionAutomatica } = req.body;

    const newStatus = AprobacionAutomatica === 0 ? 1 : 0;
    const response = await modelClase.changeStatusClase(id, newStatus);
    return res.status(200).json({ message: "Estado actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export default controllers;
