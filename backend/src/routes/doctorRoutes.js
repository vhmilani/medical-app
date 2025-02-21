const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// Endpoint para listar médicos disponíveis
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        console.error("doctorRoutes.js - Erro ao buscar médicos:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

// Endpoint para listar médicos específicos
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: "Médico não encontrado" });
        }
        res.json(doctor);
    } catch (error) {
        console.error("Erro ao buscar médico:", error);
        res.status(500).json({ error: "Erro ao buscar médico" });
        }
    });

module.exports = router;
