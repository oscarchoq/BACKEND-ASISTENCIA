import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.findAll = async (semestreID, palabra) => {
  const sql = `SELECT CursoID, SemestreID, Denominacion, RefAcademica FROM curso
                WHERE (SemestreID = ${semestreID} OR ${semestreID} IS NULL)
                AND Denominacion LIKE "%${palabra}%"
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
