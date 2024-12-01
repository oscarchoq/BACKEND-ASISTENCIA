import { Router } from "express";
import controllers from "../controllers/clase.controller.js";

const router = Router();

router.get("/", controllers.findAll);
router.post("/inscripcion", controllers.inscribir);
router.post("/inscripcion/estado", controllers.UDPestadoInscripcion);

export default router;
