import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.findAll = async (tipo, id) => {
  let where = ``;
  if (tipo === 2) {
    where = `
    SELECT 
                ac.AperturaCursoID,  
                CONCAT(pa.Denominacion, " ",  c.Denominacion, "-", ac.Grupo) AS Asignatura,
                CONCAT(p.ApellidoPaterno, " ", p.ApellidoMaterno, " ", p.Nombres) AS Docente
              FROM Inscripcion AS i
              INNER JOIN AperturaCurso AS ac ON ac.AperturaCursoID = i.ClaseID
              INNER JOIN Curso AS c ON c.CursoID = ac.CursoID
              INNER JOIN PeriodoAcademico AS pa ON pa.PeriodoID = ac.PeriodoID
              LEFT JOIN Persona AS p ON p.PersonaID = ac.DocenteID
    WHERE i.EstudianteID = ? AND i.EstadoInscripcion = "ACEPTADO"`;
  } else if (tipo === 3) {
    where = `
    SELECT
                ac.AperturaCursoID,
                CONCAT(pa.Denominacion, " ",  c.Denominacion, "-", ac.Grupo) AS Asignatura,
                CONCAT(p.ApellidoPaterno, " ", p.ApellidoMaterno, " ", p.Nombres) AS Docente
              FROM AperturaCurso AS ac
              INNER JOIN Curso AS c ON c.CursoID = ac.CursoID
              INNER JOIN PeriodoAcademico AS pa ON pa.PeriodoID = ac.PeriodoID
              LEFT JOIN Persona AS p ON p.PersonaID = ac.DocenteID
    WHERE ac.DocenteID = ?`;
  }
  let sql = ``;
  sql += where;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [id],
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      return result;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.findOne = async (id) => {
  const sql = `SELECT 
                ac.AperturaCursoID, ac.CodigoApertura, ac.AprobacionAutomatica,
                CONCAT(pa.Denominacion, " ",  c.Denominacion, "-", ac.Grupo) AS Asignatura,
                CONCAT(p.Nombres, " ", p.ApellidoPaterno, " ", p.ApellidoMaterno ) AS Docente
              FROM AperturaCurso AS ac
              INNER JOIN Curso AS c ON c.CursoID = ac.CursoID
              INNER JOIN PeriodoAcademico AS pa ON pa.PeriodoID = ac.PeriodoID
              LEFT JOIN Persona AS p ON p.PersonaID = ac.DocenteID
              WHERE ac.AperturaCursoID = ?
`;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [id],
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      const data = result?.length === 0 ? [] : result;
      return data;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.findHorarios = async (id) => {
  const sql = `SELECT HorarioID, ClaseID, DiaSemana, 
	DATE_FORMAT(HoraInicio, '%H:%i') AS HoraInicio,
	DATE_FORMAT(HoraFin, '%H:%i') AS HoraFin,
	Tolerancia, TipoClase, Activo, 
    CASE
		WHEN Activo = 1 THEN "ACTIVO"
		WHEN Activo = 0 THEN "DESACTIVO"
	END AS Estado FROM HorarioClase
              WHERE ClaseID = ?
`;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [id],
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      const data = result?.length === 0 ? [] : result;
      return data;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.createHorario = async (data, id) => {
  const tolerancia = data.Tolerancia || null;

  const sql = `INSERT INTO HorarioClase (ClaseID, DiaSemana, HoraInicio, HoraFin, Tolerancia, TipoClase)
                VALUES (?, ?, ?, ?, ?, ?)`;
  return sequelize
    .query(sql, {
      replacements: [
        data.ClaseID,
        data.DiaSemana,
        data.HoraInicio,
        data.HoraFin,
        tolerancia,
        data.TipoClase,
      ],
      type: QueryTypes.INSERT,
    })
    .then(([result, metadata]) => {
      // console.log("Inserted ID: ", result);
      // console.log("Inserted Rows afected: ", metadata);
      return result;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.updateHorario = async (id, data) => {
  const tolerancia = data.Tolerancia || null;

  const sql = `
    UPDATE HorarioClase
    SET 
      DiaSemana = ?,
      HoraInicio = ?,
      HoraFin = ?,
      Tolerancia = ?,
      TipoClase = ?
    WHERE HorarioID = ?
  `;

  return sequelize
    .query(sql, {
      replacements: [
        data.DiaSemana,
        data.HoraInicio,
        data.HoraFin,
        tolerancia,
        data.TipoClase,
        id,
      ],
      type: QueryTypes.UPDATE,
      raw: true,
    })
    .then(([result, metadata]) => {
      // console.log("Updated person RESULT: ", result);
      // console.log("Updated pers METADA: ", metadata);
      return metadata;
    })
    .catch((error) => {
      throw error;
    });
};

model.changeStatusHorario = async (id, status) => {
  const sql = `
  UPDATE HorarioClase 
  SET ACTIVO = ?
  WHERE HorarioID = ?
  `;
  return sequelize
    .query(sql, {
      replacements: [status, id],
      type: QueryTypes.UPDATE,
      raw: true,
    })
    .then(([result, metadata]) => {
      // console.log("Updated person RESULT: ", result);
      // console.log("Updated pers METADA: ", metadata);
      return metadata;
    })
    .catch((error) => {
      throw error;
    });
};

model.findInscritos = async (id, EstadoInscripcion, Codigo) => {
  const sql = `
    SELECT 
      i.InscripcionID, i.ClaseID, i.EstudianteID, i.EstadoInscripcion,
      CONCAT(p.ApellidoPaterno, " ", p.ApellidoMaterno, " ", p.Nombres) AS FullName,
      p.Codigo
    FROM Inscripcion AS i
    LEFT JOIN Persona AS p ON p.PersonaID = i.EstudianteID
    WHERE ClaseID = :id
      AND (:EstadoInscripcion IS NULL OR i.EstadoInscripcion = :EstadoInscripcion)
      AND (p.Codigo LIKE :Codigo)
  `;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      // replacements: [id],
      replacements: {
        id,
        EstadoInscripcion,
        Codigo: `%${Codigo}%`,
      },
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      return result;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.changeStatusInscripcion = async (id, status) => {
  const sql = `
  UPDATE Inscripcion 
  SET EstadoInscripcion = ?
  WHERE InscripcionID = ?
  `;
  return sequelize
    .query(sql, {
      replacements: [status, id],
      type: QueryTypes.UPDATE,
      raw: true,
    })
    .then(([result, metadata]) => {
      // console.log("Updated person RESULT: ", result);
      // console.log("Updated pers METADA: ", metadata);
      return metadata;
    })
    .catch((error) => {
      throw error;
    });
};

model.changeStatusClase = async (id, status) => {
  const sql = `
  UPDATE AperturaCurso 
  SET AprobacionAutomatica = ?
  WHERE AperturaCursoID = ?
  `;
  return sequelize
    .query(sql, {
      replacements: [status, id],
      type: QueryTypes.UPDATE,
      raw: true,
    })
    .then(([result, metadata]) => {
      // console.log("Updated person RESULT: ", result);
      // console.log("Updated pers METADA: ", metadata);
      return metadata;
    })
    .catch((error) => {
      throw error;
    });
};

export default model;
