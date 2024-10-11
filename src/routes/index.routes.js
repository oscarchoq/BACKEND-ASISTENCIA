import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.use("/", (req, res, next) => {
  console.log(`Test middleware: method=${req.method} - url=${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Bienvenido a mi API de Sistema de Asistencia.");
});

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

export default app;
