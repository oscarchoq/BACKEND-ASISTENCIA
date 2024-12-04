import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.findAll = async (id) => {
  const sql = `SELECT * FROM SesionClase
              WHERE ClaseID = ?
              `;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [id],
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      return result?.length > 0 ? result : [];
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.findSesionOne = async (id) => {
  const sql = `SELECT * FROM SesionClase
              WHERE SesionID = ?
              `;
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

model.findHorarios = async (id) => {
  const sql = `SELECT * FROM HorarioClase
              WHERE ClaseID = ?
              `;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [id],
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      return result?.length > 0 ? result : null;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.findIntervaloPeriodo = async (id) => {
  const sql = `SELECT 
                  ac.AperturaCursoID, ac.PeriodoID,
                  pa.Anio, pa.Ciclo, pa.FechaInicio, pa.FechaFin
                FROM AperturaCurso AS ac
                INNER JOIN PeriodoAcademico AS pa ON pa.PeriodoID = ac.PeriodoID
                WHERE ac.AperturaCursoID = ?
              `;
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

model.findOneSesion = async (id, data) => {
  const sql = `SELECT * 
                FROM SesionClase
                WHERE 
                  FechaSesion = ? AND 
                  HoraInicio = ? AND 
                  HoraFin = ? AND 
                  TipoClase = ? AND
                  DiaSemana = ? AND
                  ClaseID = ?
              `;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [
        data.FechaSesion,
        data.HoraInicio,
        data.HoraFin,
        data.TipoClase,
        data.DiaSemana,
        id,
      ],
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

model.createSesion = async (data, CodigoSesion) => {
  const tolerancia = data.Tolerancia || null;

  const sql = `INSERT INTO SesionClase (ClaseID, DiaSemana, FechaSesion, HoraInicio, HoraFin, Tolerancia, TipoClase, CodigoSesion)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  return sequelize
    .query(sql, {
      replacements: [
        data.ClaseID,
        data.DiaSemana,
        data.FechaSesion,
        data.HoraInicio,
        data.HoraFin,
        tolerancia,
        data.TipoClase,
        CodigoSesion,
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

model.updateSesion = async (id, data) => {
  const tolerancia = data.Tolerancia || null;

  const sql = `
    UPDATE SesionClase
    SET 
      DiaSemana = ?,
      FechaSesion = ?,
      HoraInicio = ?,
      HoraFin = ?,
      Tolerancia = ?,
      TipoClase = ?
    WHERE SesionID = ?
  `;

  return sequelize
    .query(sql, {
      replacements: [
        data.DiaSemana,
        data.FechaSesion,
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

model.findAllAsistencia = async (id) => {
  const sql = `SELECT 
	a.AsistenciaID, a.EstudianteID, a.SesionID, a.EstadoAsistencia, a.Observacion, 
    a.DispositivoID, a.Latitud, a.Longitud,
    p.Codigo, CONCAT(p.ApellidoPaterno, " ", p.ApellidoMaterno, " ", Nombres) AS FullName
FROM Asistencia a
INNER JOIN Persona p ON p.PersonaID = a.EstudianteID
WHERE SesionID = ?
              `;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [id],
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      return result?.length > 0 ? result : [];
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.updateEstadoAsistencia = async (id, newEstado, Observacion) => {
  const sql = `
    UPDATE Asistencia
    SET 
      EstadoAsistencia = ?,
      Observacion = ?
    WHERE AsistenciaID = ?
  `;

  return sequelize
    .query(sql, {
      replacements: [newEstado, Observacion || null, id],
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

model.findAsistEst = async (ClaseID, PersonaID) => {
  const sql = `SELECT 
    A.EstudianteID,
    COALESCE(SUM(CASE WHEN A.EstadoAsistencia = 1 THEN 1 ELSE 0 END), 0) AS Asistencias,
    COALESCE(SUM(CASE WHEN A.EstadoAsistencia = 2 THEN 1 ELSE 0 END), 0) AS Tardanzas,
    COALESCE(SUM(CASE WHEN A.EstadoAsistencia = 3 THEN 1 ELSE 0 END), 0) AS Faltas,
    C.Denominacion AS NombreCurso,
    CONCAT(P.Nombres, ' ', P.ApellidoPaterno, ' ', P.ApellidoMaterno) AS NombreDocente
FROM 
    Asistencia A
JOIN 
    SesionClase S ON A.SesionID = S.SesionID
JOIN 
    AperturaCurso AC ON S.ClaseID = AC.AperturaCursoID
JOIN 
    Curso C ON AC.CursoID = C.CursoID
JOIN 
    Persona P ON AC.DocenteID = P.PersonaID
WHERE 
    S.ClaseID = ?
    AND A.EstudianteID = ?
GROUP BY 
    A.EstudianteID, C.Denominacion, NombreDocente
ORDER BY 
    A.EstudianteID
              `;
  //   const sql = `SELECT
  //     A.EstudianteID,
  //     COALESCE(SUM(CASE WHEN A.EstadoAsistencia = 1 THEN 1 ELSE 0 END), 0) AS Asistencias,
  //     COALESCE(SUM(CASE WHEN A.EstadoAsistencia = 2 THEN 1 ELSE 0 END), 0) AS Tardanzas,
  //     COALESCE(SUM(CASE WHEN A.EstadoAsistencia = 3 THEN 1 ELSE 0 END), 0) AS Faltas
  // FROM
  //     Asistencia A
  // JOIN
  //     SesionClase S ON A.SesionID = S.SesionID
  // WHERE
  //     S.ClaseID = ?
  //     AND A.EstudianteID = ?
  // GROUP BY
  //     A.EstudianteID
  // ORDER BY
  //     A.EstudianteID
  // ;
  //               `;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [ClaseID, PersonaID],
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      return result[0];
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.findOneSesionCode = async (id, CodigoSesion) => {
  const sql = `SELECT * 
                FROM SesionClase
                WHERE 
                  CodigoSesion = ? AND
                  ClaseID = ?
              `;
  return sequelize
    .query(sql, {
      type: QueryTypes.SELECT,
      replacements: [CodigoSesion, id],
    })
    .then((result) => {
      // console.log("Showed pers RESULT: ", result);
      return !result || result?.length === 0 ? null : result;
    })
    .catch((error) => {
      // console.log("Error: ", error);
      throw error;
    });
};

model.marcarEstadoAsistencia = async (
  EstudianteID,
  idSesion,
  Estado,
  Latitud = "",
  Longitud = ""
) => {
  const sql = `
    INSERT INTO Asistencia (EstudianteID, SesionID, EstadoAsistencia, Latitud, Longitud)
    VALUES (${EstudianteID}, ${idSesion}, ${Estado}, "${Latitud}", "${Longitud}")
    ON DUPLICATE KEY UPDATE
    EstadoAsistencia = ${Estado}, Latitud = "${Latitud}", Longitud = "${Longitud}"
;
  `;

  return sequelize
    .query(sql, {
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
