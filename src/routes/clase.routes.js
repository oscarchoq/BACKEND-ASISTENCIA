import { Router } from "express";
import controllers from "../controllers/clase.controller.js";

const router = Router();

router.post("/inscripcion", controllers.inscribir);
router.post("/inscripcion/estado", controllers.UDPestadoInscripcion);
router.get("/", controllers.findAll);
router.get("/:id", controllers.findOne);
router.get("/:id/horario", controllers.findHorarios);
router.post("/horario", controllers.createHorario);
router.post("/horario/:id", controllers.updateHorario);
router.post("/horario/:id/status", controllers.changeStatus);

export default router;
