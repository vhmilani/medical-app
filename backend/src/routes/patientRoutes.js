const express = require("express");
const router = express.Router();
const Patient = require("../models/User");

// Endpoint para listar médicos disponíveis
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

// Endpoint para listar médicos específicos
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: "Paciente não encontrado" });
        }
        res.json(patient);
    } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        res.status(500).json({ error: "Erro ao buscar paciente" });
        }
    });

module.exports = router;
