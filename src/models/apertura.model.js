import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.findAll = async (semestreID) => {
  const sql = `
  SELECT 
    ac.AperturaCursoID, ac.CursoID, ac.PeriodoID, ac.Turno, ac.Grupo,
    c.RefAcademica As "Codigo", c.Denominacion AS "Asignatura",
    CONCAT(ac.Turno, "-", ac.Grupo) AS "T/G",
    ac.DocenteID, CONCAT(p.ApellidoPaterno, " ", p.ApellidoMaterno, " ", p.Nombres) AS "Docente",
    (SELECT COUNT(*) FROM inscripcion i WHERE i.ClaseID = ac.AperturaCursoID) AS "Matriculados"
  FROM aperturacurso AS ac
  LEFT JOIN curso AS c ON c.CursoID = ac.CursoID
  LEFT JOIN Persona AS p ON p.PersonaID = ac.DocenteID
  WHERE PeriodoID = ${semestreID}
`;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
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

model.save = async (data, CodigoApertura) => {
  const docenteID = data.DocenteID || null;
  // console.log("desde model", data);
  const sql = `
INSERT INTO aperturacurso (CursoID, DocenteID, PeriodoID, Turno, Grupo, UbicacionID, CodigoApertura)
VALUES (?, ?, ?, ?, ?, 1, ?)
`;
  return sequelize
    .query(sql, {
      replacements: [
        data.CursoID,
        docenteID,
        data.Periodo,
        data.Turno,
        data.Grupo,
        CodigoApertura,
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

model.update = async (id, data) => {
  const docenteID = data.DocenteID || null;
  const sql = `UPDATE aperturacurso
                SET 
                  PeriodoID = ?,
                  CursoID = ?,
                  DocenteID = ?,
                  Turno = ?,
                  Grupo = ?
                WHERE AperturaCursoID = ?`;
  return sequelize
    .query(sql, {
      replacements: [
        data.Periodo,
        data.CursoID,
        docenteID,
        data.Turno,
        data.Grupo,
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
      // console.log("error model => ", error);
      throw error;
    });
};

model.updateDocente = async (id, data) => {
  const sql = `UPDATE aperturacurso
              SET DocenteID = ?
              WHERE AperturaCursoID = ?
              `;
  return sequelize
    .query(sql, {
      replacements: [data.DocenteID, id],
      type: QueryTypes.UPDATE,
      raw: true,
    })
    .then(([result, metadata]) => {
      // console.log("Updated person RESULT: ", result);
      // console.log("Updated pers METADA: ", metadata);
      return metadata;
    })
    .catch((error) => {
      // console.log("error model => ", error);
      throw error;
    });
};

model.findCode = async (code) => {
  const sql = `SELECT AperturaCursoID, AprobacionAutomatica FROM aperturacurso
              WHERE CodigoApertura = ?`;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [code],
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

export default model;
