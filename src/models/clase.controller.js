import { QueryTypes } from "sequelize";
import sequelize from "../config/db.js";

const model = {};

model.findAll = async (tipo, id) => {
  let where = ``;
  if (tipo === 2) {
    where = `WHERE i.EstudianteID = ? AND i.EstadoInscripcion = "ACEPTADO"`;
  } else if (tipo === 3) {
    where = `WHERE ac.DocenteID = ?`;
  }
  let sql = `SELECT 
                ac.AperturaCursoID,  
                CONCAT(pa.Denominacion, " ",  c.Denominacion, "-", ac.Grupo) AS Asignatura,
                CONCAT(p.ApellidoPaterno, " ", p.ApellidoMaterno, " ", p.Nombres) AS Docente
              FROM Inscripcion AS i
              INNER JOIN AperturaCurso AS ac ON ac.AperturaCursoID = i.ClaseID
              INNER JOIN Curso AS c ON c.CursoID = ac.CursoID
              INNER JOIN PeriodoAcademico AS pa ON pa.PeriodoID = ac.PeriodoID
              LEFT JOIN Persona AS p ON p.PersonaID = ac.DocenteID
`;
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

export default model;
