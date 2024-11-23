import { Router } from "express";
import controllers from "../controllers/persona.controller.js";
import { typeDocente, typeEstudiante } from "../middlewares/typePerson.js";

const router = Router();

router.post("/estudiante/:id/status", controllers.changeStatus);
router.get("/estudiante/:id", typeEstudiante, controllers.mostrarById);
router.post("/estudiante/:id", controllers.update);
router.post("/estudiante", controllers.insertar);
router.get("/estudiante", typeEstudiante, controllers.mostrar);
router.post("/reniec", controllers.findReniec);

export default router;
