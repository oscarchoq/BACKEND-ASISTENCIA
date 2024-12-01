import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.save = async (ClaseID, EstudianteID, EstadoInscripcion) => {
  // console.log(ClaseID, EstudianteID, EstadoInscripcion);
  const sql = `INSERT INTO inscripcion (ClaseID, EstudianteID, EstadoInscripcion)
            VALUES (?, ?, ? )`;
  return sequelize
    .query(sql, {
      replacements: [ClaseID, EstudianteID, EstadoInscripcion],
      type: QueryTypes.INSERT,
    })
    .then(([result, metadata]) => {
      // console.log("Inserted ID: ", result);
      // console.log("Inserted Rows afected: ", metadata);
      return result;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.findOne = async (ClaseID, EstudianteID) => {
  const sql = `SELECT EstadoInscripcion FROM inscripcion
            WHERE ClaseID = ? AND EstudianteID = ?`;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [ClaseID, EstudianteID],
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      return result.length > 0 ? result[0] : null;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.update = async (InscripcionID, newEstado) => {
  const sql = `UPDATE inscripcion 
              SET EstadoInscripcion = ?
              WHERE InscripcionID = ?`;

  return sequelize
    .query(sql, {
      replacements: [newEstado, InscripcionID],
      type: QueryTypes.UPDATE,
      raw: true,
    })
    .then(([result, metadata]) => {
      // console.log("Updated person RESULT: ", result);
      // console.log("Updated pers METADA: ", metadata);
      return metadata;
    })
    .catch((error) => {
      throw error;
    });
};

export default model;
