import express from "express";
import "dotenv/config";
import cors from "cors";
import feriasRoutes from "./routes/vacationRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// --- ROTAS DA API ---
app.use("/api", feriasRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de Férias Online 🚀");
});
// Exportação para Vercel
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

export default app;
