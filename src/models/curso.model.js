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

export default model;
