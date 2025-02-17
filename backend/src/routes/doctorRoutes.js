const express = require("express");
const router = express.Router();
const Doctor = require("../models/User");

// Endpoint para listar médicos disponíveis
router.get("/", async (req, res) => {
    try {
        const doctors = await Doctor.find({ role: "doctor" }, "name specialty");
        res.status(200).json(doctors);
    } catch (error) {
        console.error("doctorRoutes.js - Erro ao buscar médicos:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

module.exports = router;
