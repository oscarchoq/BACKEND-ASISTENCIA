import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.findUser = async (arg) => {
  return sequelize
    .query("SELECT * FROM credenciales WHERE username = :username", {
      replacements: { username: arg },
      type: QueryTypes.SELECT,
    })
    .then(([result, metadata]) => {
      const data = result.lengh === 0 ? null : result;
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

model.findUserById = async (arg) => {
  return sequelize
    .query("SELECT * FROM persona WHERE id = :id", {
      replacements: { id: arg },
      type: QueryTypes.SELECT,
    })
    .then(([result, metadata]) => {
      const data = result.length === 0 ? null : result;
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

model.insertUser = async (arg) => {
  console.log("Inserting user: ", arg);
  const sql = `INSERT INTO credenciales (username, password, persona_id)
                VALUES (?, ?, ?)`;
  return sequelize
    .query(sql, {
      replacements: [arg.username, arg.password, arg.persona_id],
      type: QueryTypes.INSERT,
    })
    .then(([result, metadata]) => {
      console.log("Inserted: ", result);
      console.log("Inserted: ", metadata);
      return result;
    })
    .catch((error) => {
      console.log("Error: ", error);
      throw error;
    });
};

export default model;
