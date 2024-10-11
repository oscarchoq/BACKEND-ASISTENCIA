import { Sequelize } from "sequelize";
import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config.js";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connect success");
  })
  .catch((error) => {
    console.log("Failed to connect: ", error);
  });

export default sequelize;
