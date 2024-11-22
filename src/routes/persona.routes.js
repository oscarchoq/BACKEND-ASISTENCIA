import { Router } from "express";
import controllers from "../controllers/persona.controller.js";

const router = Router();

router.get("/estudiante/:id", controllers.mostrarById);
router.post("/estudiante/:id", controllers.update);
router.post("/estudiante", controllers.insertar);
router.get("/estudiante", controllers.mostrar);
router.post("/reniec", controllers.findReniec);

export default router;
