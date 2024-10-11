import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

// Mis rutas
import myRoutes from "./routes/index.routes.js";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(myRoutes);

app.set("port", process.env.PORT || 3000);

export default app;
