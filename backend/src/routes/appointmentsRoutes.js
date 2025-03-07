const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/authMiddleware');

// Criar um novo agendamento
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { userId, doctorId, date, time } = req.body;

    if (!userId || !doctorId || !date || !time) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const newAppointment = new Appointment({ userId, doctorId, date, time });
    await newAppointment.save();

    res.status(201).json({ message: "Consulta agendada com sucesso!", appointment: newAppointment });
  } catch (error) {
    console.error('Erro ao criar consulta:', error);
    res.status(500).json({ error: "Erro ao criar consulta." });
  }
});

// Atualizar o status de uma consulta
router.put('/update/:appointmentId', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pendente", "cancelado", "confirmado"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Status inválido." });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Consulta não encontrada." });
    }

    res.json({ message: "Status da consulta atualizado com sucesso!", appointment: updatedAppointment });
  } catch (error) {
    console.error('Erro ao atualizar status da consulta:', error);
    res.status(500).json({ error: "Erro ao atualizar status da consulta." });
  }
});


// Buscar consultas do paciente logado
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.userId, status: { $ne: "cancelado"} });
    res.json(appointments);
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    res.status(500).json({ error: 'Erro ao buscar consultas' });
  }
});

// Buscar consultas do médico logado
router.get('/doctor/:doctorId', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId, status: { $ne: "cancelado"} });
    res.json(appointments);
  } catch (error) {
    console.error('Erro ao buscar consultas do médico:', error);
    res.status(500).json({ error: 'Erro ao buscar consultas do médico' });
  }
});

module.exports = router;
