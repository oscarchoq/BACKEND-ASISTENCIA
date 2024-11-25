import { Router } from "express";
import controllers from "../controllers/academico.controller.js";

const router = Router();

router.get("/periodo", controllers.mostrar);
router.post("/periodo", controllers.insertar);
router.get("/periodo/:id", controllers.mostrarById);
router.post("/periodo/:id", controllers.update);
router.post("/periodo/:id/status", controllers.changeStatus);

export default router;
