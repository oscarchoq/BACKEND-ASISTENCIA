import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.findGradoInstruccion = async () => {
  return sequelize
    .query("SELECT * FROM grado_instruccion", {
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      // console.log(result);
      const data = result.length === 0 ? null : result;
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

model.findTipoDocumento = async () => {
  return sequelize
    .query("SELECT * FROM tipo_documento", {
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      // console.log(result);
      const data = result.length === 0 ? null : result;
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

model.findEstadoCivil = async () => {
  return sequelize
    .query("SELECT * FROM estado_civil", {
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      // console.log(result);
      const data = result.length === 0 ? null : result;
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

export default model;
