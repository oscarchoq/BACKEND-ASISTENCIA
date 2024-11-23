const typeEstudiante = (req, res, next) => {
  req.typePerson = 2; // Estudiante
  next();
};

const typeDocente = (req, res, next) => {
  req.typePerson = 3; // Docente
  next();
};

export { typeEstudiante, typeDocente };
