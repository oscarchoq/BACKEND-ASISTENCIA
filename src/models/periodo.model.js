import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.findAll = async () => {
  const sql = `SELECT 
                  PeriodoID, Anio, Ciclo, Denominacion, FechaInicio, FechaFin, 
                  Activo, DATE(FechaRegistro) AS FechaRegistro, 
                  CASE
                    WHEN Activo = 1 THEN "ACTIVO"
                    WHEN Activo = 0 THEN "DESACTIVO"
                  END AS Estado
                FROM periodoacademico
                WHERE Eliminado = 0`;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      return result;
    })
    .catch((error) => {
      console.log("Error: ", error);
      throw error;
    });
};

model.save = async (data) => {
  console.log(data);
  const sql = `INSERT INTO periodoacademico (Anio, Ciclo, Denominacion, FechaInicio, FechaFin)
              VALUES (?, ?, ?, ?, ?);`;

  return sequelize
    .query(sql, {
      replacements: [
        data.Anio,
        data.Ciclo,
        data.Denominacion,
        data.FechaInicio,
        data.FechaFin,
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

model.findById = async (id) => {
  const sql = `SELECT * FROM PeriodoAcademico WHERE PeriodoID = ?`;
  return sequelize
    .query(sql, {
      replacements: [id],
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      return result[0];
    })
    .catch((error) => {
      console.log("Error: ", error);
      throw error;
    });
};

model.update = async (id, data) => {
  const sql = `
    UPDATE periodoacademico
    SET 
      Anio = ?,
      Ciclo = ?,
      Denominacion = ?,
      FechaInicio = ?,
      FechaFin = ?
    WHERE PeriodoID = ?
  `;

  return sequelize
    .query(sql, {
      replacements: [
        data.Anio,
        data.Ciclo,
        data.Denominacion,
        data.FechaInicio,
        data.FechaFin,
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

model.validarPeriodo = async (Anio, Ciclo, id) => {
  const sql = `
    SELECT COUNT(*) AS validarPeriodo FROM PeriodoAcademico 
    WHERE Anio = ? AND Ciclo = ? AND PeriodoID != ?
  `;
  return sequelize
    .query(sql, {
      replacements: [Anio, Ciclo, id],
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      // console.log("Validated doc RESULT: ", result[0].validarNumDoc);
      return result[0].validarPeriodo < 1;
    })
    .catch((error) => {
      throw error;
    });
};

// Chagen status ACTIVO
model.changeStatus = async (id, status) => {
  const sql = `
  UPDATE periodoacademico 
  SET ACTIVO = ?
  WHERE PeriodoID = ?
  `;
  return sequelize
    .query(sql, {
      replacements: [status, id],
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
