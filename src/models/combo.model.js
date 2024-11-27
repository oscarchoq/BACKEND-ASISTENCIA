import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.findGradoInstruccion = async () => {
  return sequelize
    .query("SELECT * FROM GradoInstruccion", {
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
    .query("SELECT * FROM TipoDocumento", {
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
    .query("SELECT * FROM EstadoCivil", {
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

model.findPeriodo = async () => {
  return sequelize
    .query(
      `SELECT PeriodoID, CONCAT(Anio, "-", Ciclo) AS Denominacion FROM periodoacademico`,
      {
        type: QueryTypes.SELECT,
      }
    )
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
