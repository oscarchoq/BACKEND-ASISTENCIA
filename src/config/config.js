import { config } from "dotenv";

config();
export const PORT = process.env.PORT || 3000;
export const DB_NAME = process.env.DB_NAME || "mvc";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || "3306";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_DIALECT = process.env.DB_DIALECT || "mysql";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "your-secret-key";
export const RENIEC_API_KEY = process.env.RENIEC_API_KEY || "";
