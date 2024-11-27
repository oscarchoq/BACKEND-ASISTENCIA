import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.findAll = async (semestreID) => {
  const sql = `
  SELECT 
    ac.AperturaCursoID, ac.CursoID, ac.PeriodoID,
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
      console.log("Showed pers RESULT: ", result);
      return result;
    })
    .catch((error) => {
      console.log("Error: ", error);
      throw error;
    });
};

model.save = async (data, CodigoApertura) => {
  const docenteID = data.DocenteID || null;
  console.log("desde model", data);
  const sql = `
INSERT INTO aperturacurso (CursoID, DocenteID, PeriodoID, Turno, Grupo, UbicacionID, CodigoApertura)
VALUES (?, ?, ?, ?, ?, 1, ?)
`;
  console.log("sql,", sql);
  console.log(docenteID);
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
      console.log("Inserted ID: ", result);
      console.log("Inserted Rows afected: ", metadata);
      return result;
    })
    .catch((error) => {
      console.log("Error: ", error);
      throw error;
    });
};

export default model;
