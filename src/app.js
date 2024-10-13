import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { PORT } from "./config/config.js";

// Mis rutas
import myRoutes from "./routes/index.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(myRoutes);

app.set("port", PORT);

export default app;
