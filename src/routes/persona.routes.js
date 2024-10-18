import { Router } from "express";
import controllers from "../controllers/persona.controller.js";

const router = Router();

router.post("/estudiante", controllers.insertar);

export default router;
