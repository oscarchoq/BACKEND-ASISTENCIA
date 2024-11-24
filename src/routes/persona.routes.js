import { Router } from "express";
import controllers from "../controllers/persona.controller.js";
import { typeDocente, typeEstudiante } from "../middlewares/typePerson.js";

const router = Router();

// RENIEC
router.post("/reniec", controllers.findReniec);

// ESTUDIANTES
router.post("/estudiante/:id/status", controllers.changeStatus);
router.get("/estudiante/:id", typeEstudiante, controllers.mostrarById);
router.post("/estudiante/:id", controllers.update);
router.post("/estudiante", controllers.insertar);
router.get("/estudiante", typeEstudiante, controllers.mostrar);

// DOCENTES
router.post("/docente", controllers.insertar);
router.get("/docente", typeDocente, controllers.mostrar);
router.get("/docente/:id", typeDocente, controllers.mostrarById);
router.post("/docente/:id", controllers.update);

export default router;
