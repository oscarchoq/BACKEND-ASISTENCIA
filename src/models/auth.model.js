import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.findUser = async (arg) => {
  const sql = `SELECT c.PersonaID, c.Password, c.Activo FROM Credenciales AS c
                INNER JOIN Persona AS p ON p.PersonaID = c.PersonaID
                WHERE Codigo = :username`;
  return sequelize
    .query(sql, {
      replacements: { username: arg },
      type: QueryTypes.SELECT,
    })
    .then(([result]) => {
      // console.log("User found: ", result);
      if (!result || result.length === 0) {
        return null;
      }
      return result;
    })
    .catch((error) => {
      throw error;
    });
};

model.findUserById = async (arg) => {
  const sql = `SELECT PersonaID, Nombres, ApellidoPaterno, ApellidoMaterno, CorreoInstitucional, TipoPersonaID
                FROM Persona
                WHERE PersonaID = :id`;
  // console.log("User found: ", arg);
  return sequelize
    .query(sql, {
      replacements: { id: arg },
      type: QueryTypes.SELECT,
    })
    .then(([result, metadata]) => {
      const data = result?.length === 0 ? null : result;
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

model.insertUser = async (arg) => {
  // console.log("Inserting user: ", arg);
  const sql = `INSERT INTO Credenciales (PersonaID, Password)
                VALUES (?, ?)`;
  return sequelize
    .query(sql, {
      replacements: [arg.persona_id, arg.password],
      type: QueryTypes.INSERT,
    })
    .then(([result, metadata]) => {
      // console.log("Inserted: ", result);
      // console.log("Inserted: ", metadata);
      return result;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

export default model;
