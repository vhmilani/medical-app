const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/authMiddleware');

// Criar um novo agendamento
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { patientId, doctorId, date, time } = req.body;

    if (!patientId || !doctorId || !date || !time) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const newAppointment = new Appointment({ patientId, doctorId, date, time });
    await newAppointment.save();

    res.status(201).json({ message: "Consulta agendada com sucesso!", appointment: newAppointment });
  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    res.status(500).json({ error: "Erro ao criar consulta." });
  }
});

// Buscar consultas do paciente logado
router.get('/patient/:patientId', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.params.patientId });
    res.json(appointments);
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    res.status(500).json({ error: 'Erro ao buscar consultas' });
  }
});

// Buscar consultas do médico logado
router.get('/doctor/:doctorId', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId });
    res.json(appointments);
  } catch (error) {
    console.error('Erro ao buscar consultas do médico:', error);
    res.status(500).json({ error: 'Erro ao buscar consultas do médico' });
  }
});

module.exports = router;
