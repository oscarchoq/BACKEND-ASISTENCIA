import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.insertar = async (data) => {
  const sql = `INSERT INTO Persona (TipoDocID, NumeroDocumento, ApellidoPaterno, ApellidoMaterno, Nombres, Sexo, FechaNacimiento, EstadoCivilID, CorreoInstitucional, CorreoPersonal, NumeroCelular, NumeroCelular2, GradoInstruccionID, TipoPersonaID, Codigo, FechaRegistro) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW() )
`;

  return sequelize
    .query(sql, {
      // raw: true,
      replacements: [
        data.TipoDocID,
        data.NumeroDocumento,
        data.ApellidoPaterno,
        data.ApellidoMaterno,
        data.Nombres,
        data.Sexo,
        data.FechaNacimiento || null,
        data.EstadoCivilID,
        data.CorreoInstitucional || null,
        data.CorreoPersonal || null,
        data.NumeroCelular || null,
        data.NumeroCelular2 || null,
        data.GradoInstruccionID,
        data.TipoPersonaID,
        data.Codigo,
      ],
      type: QueryTypes.INSERT,
    })
    .then(([result, metadata]) => {
      console.log("Inserted ID: ", result);
      console.log("Inserted Rows afected: ", metadata);
      return result;
    })
    .catch((error) => {
      console.log("Error: ", error);
      throw error;
    });
};

model.mostrar = async (id) => {
  const sql = "SELECT * FROM persona WHERE tipo_pers_id = ?";
  return sequelize
    .query(sql, {
      replacements: [id],
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      console.log("Showed pers RESULT: ", result);
      return result;
    })
    .catch((error) => {
      console.log("Error: ", error);
      throw error;
    });
};

model.mostrarById = async (id) => {
  // const sql = "SELECT * FROM persona WHERE id = ?";
  const sql = `SELECT 
    p.id,
    p.tipo_doc_id,
    p.nro_documento,
    p.apellido_paterno,
    p.apellido_materno,
    p.nombres,
    p.sexo,
    p.nro_celular,
    p.correo_institucional,
    p.correo_personal,
    p.fecha_nacimiento,
    p.estado_civil_id,
    p.grado_instruccion_id,
    p.tipo_pers_id,
    c.username AS cod_matricula
FROM 
    persona p
LEFT JOIN 
    credenciales c ON p.id = c.persona_id
WHERE 
    p.id = ?
`;
  return sequelize
    .query(sql, {
      replacements: [id],
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      console.log("Showed pers RESULT: ", result);
      return result[0];
    })
    .catch((error) => {
      console.log("Error: ", error);
      throw error;
    });
};

model.update = async (id, data) => {
  const sql =
    "UPDATE persona SET apellido_paterno = ?, apellido_materno = ?, nombres = ?, sexo = ?, nro_celular = ?, correo_institucional = ?, correo_personal = ?, fecha_nacimiento = ?, estado_civil_id = ?, grado_instruccion_id = ? WHERE id =?";
  return sequelize
    .query(sql, {
      replacements: [
        data.apellido_paterno,
        data.apellido_materno,
        data.nombres,
        data.sexo,
        data.nro_celular || "",
        data.correo_institucional || "",
        data.correo_personal || "",
        data.fecha_nacimiento,
        data.estado_civil,
        data.grado_instruccion,
        id,
      ],
      type: QueryTypes.UPDATE,
    })
    .then(([result, metadata]) => {
      console.log("Updated pers RESULT: ", result);
      console.log("Updated pers METADA: ", metadata);
      return metadata;
    })
    .catch((error) => {
      throw error;
    });
};

// VALIDACION DE NUMERO DE DOCUMENTO
model.validarDocumento = async (numDocumento) => {
  const sql =
    "SELECT COUNT(*) AS validarNumDoc FROM Persona WHERE NumeroDocumento = ?";
  return sequelize
    .query(sql, {
      replacements: [numDocumento],
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      console.log("Validated doc RESULT: ", result[0].validarNumDoc);
      return result[0].validarNumDoc < 1;
    })
    .catch((error) => {
      throw error;
    });
};

// VALIDACION DE CORREO INSTITUCIONAL
model.validarCorreoInstitucional = async (correo) => {
  const sql =
    "SELECT COUNT(*) AS validarCorreoInst FROM Persona WHERE CorreoInstitucional = ?";
  return sequelize
    .query(sql, {
      replacements: [correo],
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      console.log("Validated email RESULT: ", result[0].validarCorreoInst);
      return result[0].validarCorreoInst < 1;
    })
    .catch((error) => {
      throw error;
    });
};
// "CorreoInstitucional": "admin@esisdev.site",

export default model;
