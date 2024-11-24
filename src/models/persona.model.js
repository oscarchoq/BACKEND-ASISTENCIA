import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.insertar = async (data) => {
  console.log(data.TipoPersonaID);
  let sql;
  if (data.TipoPersonaID === 2) {
    sql = `INSERT INTO Persona (TipoDocID, NumeroDocumento, ApellidoPaterno, ApellidoMaterno, Nombres, Sexo, FechaNacimiento, EstadoCivilID, CorreoInstitucional, CorreoPersonal, NumeroCelular, NumeroCelular2, GradoInstruccionID, TipoPersonaID, Codigo, FechaRegistro) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "${data.Codigo}", NOW() )
    `;
  } else if (data.TipoPersonaID === 3) {
    sql = `
    INSERT INTO Persona (TipoDocID, NumeroDocumento, ApellidoPaterno, ApellidoMaterno, Nombres, Sexo, FechaNacimiento, EstadoCivilID, CorreoInstitucional, CorreoPersonal, NumeroCelular, NumeroCelular2, GradoInstruccionID, TipoPersonaID, Codigo, FechaRegistro)
    VALUES 
    ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      CONCAT(
        SUBSTRING("${data.ApellidoPaterno}", 1, 1), 
            SUBSTRING("${data.ApellidoMaterno}", 1, 1), 
            "-",
            LPAD(
          (SELECT AUTO_INCREMENT 
                FROM information_schema.tables 
                WHERE table_name = 'Persona' 
                AND table_schema = DATABASE()),
                5, "0"
            )
      ),
        NOW()
    )
    `;
  }

  console.log("todo good SQLazo => ", sql);
  return sequelize
    .query(sql, {
      // raw: true,
      replacements: [
        data.TipoDocID,
        data.NumeroDocumento,
        data.ApellidoPaterno,
        data.ApellidoMaterno,
        data.Nombres,
        data.Sexo,
        data.FechaNacimiento || null,
        data.EstadoCivilID,
        data.CorreoInstitucional || null,
        data.CorreoPersonal || null,
        data.NumeroCelular || null,
        data.NumeroCelular2 || null,
        data.GradoInstruccionID,
        data.TipoPersonaID,
        // data.Codigo,
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

model.findAll = async (id) => {
  const sql = `SELECT 
                  PersonaID, 
                  Codigo,
                  CONCAT(ApellidoPaterno, " ", ApellidoMaterno, " ", Nombres) AS FullName, 
                  NumeroDocumento,
                  Activo,
                  date(FechaRegistro) AS FechaRegistro,
                  CASE
                    WHEN Activo = 1 THEN "ACTIVO"
                    WHEN Activo = 0 THEN "DESACTIVO"
                  END AS Estado
              FROM Persona
              WHERE Eliminado = 0 AND TipoPersonaID = ?`;
  return sequelize
    .query(sql, {
      replacements: [id],
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

model.findById = async (id, typePerson) => {
  const sql = `SELECT * FROM Persona WHERE TipoPersonaID = ? AND PersonaID =?`;
  console.log("SQLazo => ", sql);
  return sequelize
    .query(sql, {
      replacements: [typePerson, id],
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      console.log("Showed pers RESULT: ", result);
      return result[0];
    })
    .catch((error) => {
      console.log("Error: ", error);
      throw error;
    });
};

model.update = async (id, data) => {
  const sql = `
    UPDATE Persona
    SET
      TipoDocID = ?, 
      NumeroDocumento = ?, 
      ApellidoPaterno = ?, 
      ApellidoMaterno = ?, 
      Nombres = ?, 
      Sexo = ?, 
      FechaNacimiento = ?, 
      EstadoCivilID = ?, 
      CorreoInstitucional = ?, 
      CorreoPersonal = ?, 
      NumeroCelular = ?, 
      NumeroCelular2 = ?, 
      GradoInstruccionID = ?, 
      TipoPersonaID = ?, 
      Codigo = ?
    WHERE PersonaID = ?
  `;

  return sequelize
    .query(sql, {
      replacements: [
        data.TipoDocID,
        data.NumeroDocumento,
        data.ApellidoPaterno,
        data.ApellidoMaterno,
        data.Nombres,
        data.Sexo,
        data.FechaNacimiento,
        data.EstadoCivilID,
        data.CorreoInstitucional || "",
        data.CorreoPersonal || "",
        data.NumeroCelular || "",
        data.NumeroCelular2 || "",
        data.GradoInstruccionID,
        data.TipoPersonaID,
        data.Codigo,
        id,
      ],
      type: QueryTypes.UPDATE,
      raw: true,
    })
    .then(([result, metadata]) => {
      console.log("Updated person RESULT: ", result);
      // let info = result.info.split(" "); // convertir respuesta a array
      // console.log(info);
      console.log("Updated pers METADA: ", metadata);
      return metadata;
    })
    .catch((error) => {
      throw error;
    });
};

// VALIDACION DE NUMERO DE DOCUMENTO
model.validarDocumento = async (numDocumento, id) => {
  const sql =
    "SELECT COUNT(*) AS validarNumDoc FROM Persona WHERE NumeroDocumento = ? AND PersonaID != ?";
  return sequelize
    .query(sql, {
      replacements: [numDocumento, id],
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      console.log("Validated doc RESULT: ", result[0].validarNumDoc);
      return result[0].validarNumDoc < 1;
    })
    .catch((error) => {
      throw error;
    });
};

// VALIDACION DE CORREO INSTITUCIONAL
model.validarCorreoInstitucional = async (correo, id) => {
  const sql =
    "SELECT COUNT(*) AS validarCorreoInst FROM Persona WHERE CorreoInstitucional = ? AND PersonaID != ?";
  return sequelize
    .query(sql, {
      replacements: [correo, id],
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      console.log("Validated email RESULT: ", result[0].validarCorreoInst);
      return result[0].validarCorreoInst < 1;
    })
    .catch((error) => {
      throw error;
    });
};

// VALIDACION DE CODIGO
model.validarCodigo = async (codigo, id) => {
  const sql =
    "SELECT COUNT(*) AS validarCodigo FROM Persona WHERE Codigo = ? AND PersonaID != ?";
  return sequelize
    .query(sql, {
      replacements: [codigo, id],
      type: QueryTypes.SELECT,
    })
    .then((result) => {
      console.log("Validated codigo RESULT: ", result[0].validarCodigo);
      return result[0].validarCodigo < 1;
    })
    .catch((error) => {
      throw error;
    });
};

// Chagen status ACTIVO
model.changeStatus = async (id, status) => {
  const sql = `
  UPDATE Persona
  SET Activo = ?
  WHERE PersonaID = ?`;
  return sequelize
    .query(sql, {
      replacements: [status, id],
      type: QueryTypes.UPDATE,
      raw: true,
    })
    .then(([result, metadata]) => {
      console.log("Updated person RESULT: ", result);
      // let info = result.info.split(" "); // convertir respuesta a array
      // console.log(info);
      console.log("Updated pers METADA: ", metadata);
      return metadata;
    })
    .catch((error) => {
      throw error;
    });
};
export default model;
