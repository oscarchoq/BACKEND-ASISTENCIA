import { Router } from "express";
import controllers from "../controllers/auth.controller.js";

const router = Router();

router.get("/verify", controllers.verify);
router.post("/login", controllers.login);
router.post("/register", controllers.register);
router.post("/logout", controllers.logout);

export default router;
