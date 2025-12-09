import express from "express";
import cors from "cors";
import feriasRoutes from "./routes/vacationRoutes.js";

const app = express();

// Configuração de CORS segura
app.use(
  cors({
    origin: "https://web-ferias.vercel.app", // frontend autorizado
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Tratamento explícito do preflight OPTIONS
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://web-ferias.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use(express.json());

// --- Rotas da API ---
app.use("/api", feriasRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de Férias Online 🚀");
});

// Exportação para Vercel
export default app;
