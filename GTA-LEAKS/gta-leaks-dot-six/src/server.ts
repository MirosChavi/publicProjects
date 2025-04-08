import express, { Express } from "express";
import leakRoutes from "./routes/leaks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import connectDB from "./database.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// Определение __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const PORT = 5000;

connectDB();
console.log("MongoDB connected.");

app.use(express.json());

app.use("/api/leaks", leakRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
console.log("Routes added.");

app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
