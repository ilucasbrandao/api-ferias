import { Router } from "express";

import { calcularFeriasController } from "../controllers/vacationController.js";
const router = Router();

router.post("/calcular-ferias", calcularFeriasController);
export default router;
