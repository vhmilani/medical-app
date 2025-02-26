const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Endpoint para listar médicos disponíveis
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

// Endpoint para listar médicos específicos
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "Paciente não encontrado" });
        }
        res.json(user);
    } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        res.status(500).json({ error: "Erro ao buscar paciente" });
        }
    });

module.exports = router;
