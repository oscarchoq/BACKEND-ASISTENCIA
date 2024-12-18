import express from "express";
import cors from "cors";

// Mis rutas
import authRoutes from "./auth.routes.js";
import comboRoutes from "./combos.routes.js";
import academicoRoutes from "./academico.routes.js";
import personaRoutes from "./persona.routes.js";
import claseRoutes from "./clase.routes.js";
import { FRONTEND_URL } from "../config/config.js";
import { authRequired } from "../middlewares/validateToken.js";

const app = express();
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use("/", (req, res, next) => {
  console.log(`Test middleware: method=${req.method} - url=${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Bienvenido a mi API de Sistema de Asistencia.");
});

// Importar rutas
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/persona", personaRoutes);
app.use("/api/v1/combos", comboRoutes);
app.use("/api/v1/academico", academicoRoutes);
app.use("/api/v1/clase", authRequired, claseRoutes);

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

export default app;
