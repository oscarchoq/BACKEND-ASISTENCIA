import express from "express";
import cors from "cors";

// Mis rutas
import authRoutes from "./auth.routes.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
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

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

export default app;
