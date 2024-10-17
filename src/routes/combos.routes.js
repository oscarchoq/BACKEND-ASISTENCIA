import { Router } from "express";
import controllers from "../controllers/combos.controller.js";

const router = Router();

router.get("/gradoInstruccion", controllers.gradoInstruccion);
router.get("/tipoDocumento", controllers.tipoDocumento);
router.get("/estadoCivil", controllers.estadoCivil);

export default router;
