import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.findAll = async (id) => {
  const sql = `SELECT * FROM SesionClase
              WHERE ClaseID = ?
              `;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [id],
    })
    .then((result) => {
      console.log("Showed pers RESULT: ", result);
      return result?.length > 0 ? result : [];
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.findHorarios = async (id) => {
  const sql = `SELECT * FROM HorarioClase
              WHERE ClaseID = ?
              `;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [id],
    })
    .then((result) => {
      console.log("Showed pers RESULT: ", result);
      return result?.length > 0 ? result : null;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.findIntervaloPeriodo = async (id) => {
  const sql = `SELECT 
                  ac.AperturaCursoID, ac.PeriodoID,
                  pa.Anio, pa.Ciclo, pa.FechaInicio, pa.FechaFin
                FROM AperturaCurso AS ac
                INNER JOIN PeriodoAcademico AS pa ON pa.PeriodoID = ac.PeriodoID
                WHERE ac.AperturaCursoID = ?
              `;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [id],
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      return result;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.findOneSesion = async (id, data) => {
  const sql = `SELECT * 
                FROM SesionClase
                WHERE 
                  FechaSesion = ? AND 
                  HoraInicio = ? AND 
                  HoraFin = ? AND 
                  TipoClase = ? AND
                  DiaSemana = ? AND
                  ClaseID = ?
              `;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [
        data.FechaSesion,
        data.HoraInicio,
        data.HoraFin,
        data.TipoClase,
        data.DiaSemana,
        id,
      ],
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      return result;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.createSesion = async (data) => {
  const tolerancia = data.Tolerancia || null;

  const sql = `INSERT INTO SesionClase (ClaseID, DiaSemana, FechaSesion, HoraInicio, HoraFin, Tolerancia, TipoClase)
              VALUES (?, ?, ?, ?, ?, ?, ?)`;

  return sequelize
    .query(sql, {
      replacements: [
        data.ClaseID,
        data.DiaSemana,
        data.FechaSesion,
        data.HoraInicio,
        data.HoraFin,
        tolerancia,
        data.TipoClase,
      ],
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

model.updateSesion = async (id, data) => {
  const tolerancia = data.Tolerancia || null;

  const sql = `
    UPDATE SesionClase
    SET 
      DiaSemana = ?,
      FechaSesion = ?,
      HoraInicio = ?,
      HoraFin = ?,
      Tolerancia = ?,
      TipoClase = ?
    WHERE SesionID = ?
  `;

  return sequelize
    .query(sql, {
      replacements: [
        data.DiaSemana,
        data.FechaSesion,
        data.HoraInicio,
        data.HoraFin,
        tolerancia,
        data.TipoClase,
        id,
      ],
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
