import { Router } from "express";
import controllers from "../controllers/clase.controller.js";
import AsistenciaController from "../controllers/asistencia.controller.js";

const router = Router();

router.post("/inscripcion", controllers.inscribir);
router.post("/inscripcion/estado", controllers.UDPestadoInscripcion);
router.get("/inscripcion/:id/status", controllers.changeStatusInscripcion);
router.get("/:id/inscritos", controllers.mostrarInscritos);

router.post("/horario", controllers.createHorario);
router.post("/horario/:id/status", controllers.changeStatus);
router.post("/horario/:id", controllers.updateHorario);
router.get("/:id/horario", controllers.findHorarios);

router.post("/asistencia", AsistenciaController.createSesion);
router.get("/asistencia/:id", AsistenciaController.mostrarAsistencia);
router.post("/asistencia/:id/marcar", AsistenciaController.marcarAsistencia);
router.post("/asistencia/:id", AsistenciaController.updateSesion);
router.get("/:id/asistencia", AsistenciaController.mostrar);

router.get("/", controllers.findAll);
router.get("/:id", controllers.findOne);
router.post("/:id", controllers.changeStatusClase);

export default router;
