import express from "express";
import cors from "cors";
import feriasRoutes from "./routes/vacationRoutes.js";

const app = express();

// Necessário para proxies como Railway/Vercel
app.set("trust proxy", true);

// CORS
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500", // Live Server
      "http://localhost:5500", // Live Server alternativo
      "https://web-ferias.vercel.app", // Sua produção
    ],
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

// Preflight OPTIONS
app.options("*", cors());

app.use(express.json());

// Rotas
app.use("/api", feriasRoutes);

// Teste
app.get("/", (req, res) => {
  res.send("API de Férias Online 🚀");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
