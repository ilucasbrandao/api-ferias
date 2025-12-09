import { calcularFeriasService } from "../services/vacationService.js";

export const calcularFeriasController = (req, res) => {
  try {
    const resultado = calcularFeriasService(req.body);
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
