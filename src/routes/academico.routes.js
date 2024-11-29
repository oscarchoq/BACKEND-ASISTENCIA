import { Router } from "express";
import CcontrollerPeriodo from "../controllers/periodo.controller.js";
import ControllerCurso from "../controllers/curso.controller.js";
import ControllerApertura from "../controllers/apertura.controller.js";

const router = Router();

// PERIODOS
router.get("/periodo", CcontrollerPeriodo.mostrar);
router.post("/periodo", CcontrollerPeriodo.insertar);
router.get("/periodo/:id", CcontrollerPeriodo.mostrarById);
router.post("/periodo/:id", CcontrollerPeriodo.update);
router.post("/periodo/:id/status", CcontrollerPeriodo.changeStatus);

// CURSOS
router.get("/curso", ControllerCurso.mostrar);

// APERTURA DE GRUPOS
router.get("/apertura", ControllerApertura.mostrar);
router.post("/apertura", ControllerApertura.insertar);
router.post("/apertura/:id", ControllerApertura.update);
router.post("/apertura/:id/docente", ControllerApertura.updateDocente);

export default router;
