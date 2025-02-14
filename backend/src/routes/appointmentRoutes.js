const express = require("express");
const { 
  createAppointment, 
  getAppointments, 
  confirmAppointment, 
  cancelAppointment 
} = require("../controllers/appointmentController"); // Certifique-se de que o caminho está correto!

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createAppointment); // Criar agendamento
router.get("/", authMiddleware, getAppointments);    // Listar consultas
router.put("/:appointmentId/confirm", authMiddleware, confirmAppointment); // Confirmar consulta
router.put("/:appointmentId/cancel", authMiddleware, cancelAppointment);   // Cancelar consulta

module.exports = router;
