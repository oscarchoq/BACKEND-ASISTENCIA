import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.insertar = async (data) => {
  console.log(data.tipo_doc_id);
  console.log(data.nro_celular || "");
  const sql =
    "INSERT INTO persona (tipo_doc_id, nro_documento, apellido_paterno, apellido_materno, nombres, sexo, nro_celular, correo_institucional, correo_personal, fecha_nacimiento, estado_civil_id, grado_instruccion_id, tipo_pers_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

  return sequelize
    .query(sql, {
      // raw: true,
      replacements: [
        data.tipo_doc_id,
        data.nro_documento,
        data.apellido_paterno,
        data.apellido_materno,
        data.nombres,
        data.sexo,
        data.nro_celular || "",
        data.correo_institucional || "",
        data.correo_personal || "",
        data.fecha_nacimiento,
        data.estado_civil,
        data.grado_instruccion,
        data.tipo_pers_id,
      ],
      type: QueryTypes.INSERT,
    })
    .then(([result, metadata]) => {
      console.log("Inserted pers RESULT: ", result);
      console.log("Inserted pers METADA: ", metadata);
      return result;
    })
    .catch((error) => {
      console.log("Error: ", error);
      throw error;
    });
};

// model.insertar = async (data) => {
//   return sequelize
//     .query("SELECT * FROM grado_instruccion", {
//       type: QueryTypes.SELECT,
//     })
//     .then((result) => {
//       console.log(result);
//       const data = result.length === 0 ? null : result;
//       return data;
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

export default model;
