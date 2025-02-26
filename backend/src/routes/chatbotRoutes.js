const express = require("express");
const router = express.Router();
const chatWithGPT = require("../services/chatgptService");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "A mensagem é obrigatória." });
    }

    const response = await chatWithGPT(message);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Erro no chatbot:", error);
    res.status(500).json({ error: "Erro ao processar sua solicitação." });
  }
});

module.exports = router;
