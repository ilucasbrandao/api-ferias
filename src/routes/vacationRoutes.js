import { Router } from "express";

import { calcularFeriasController } from "../controllers/vacationController.js";
const router = Router();

router.post("/", calcularFeriasController);
export default router;
