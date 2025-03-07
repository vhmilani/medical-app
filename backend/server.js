require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Inicializa o servidor
const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.log("Erro ao conectar MongoDB:", err));

// Rota básica para testar
app.get("/", (req, res) => {
  res.send("API do Medical App está rodando 🚀");
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => console.log(`Servidor rodando na porta ${PORT}`));

const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

const chatbotRoutes = require("./src/routes/chatbotRoutes");
app.use("/api/chatbot", chatbotRoutes);

const doctorRoutes = require("./src/routes/doctorRoutes");
app.use("/api/doctors", doctorRoutes);

const userRoutes = require("./src/routes/userRoutes");
app.use("/api/users", userRoutes);

const authMiddleware = require("./src/middleware/authMiddleware");

const appointmentsRoutes = require("./src/routes/appointmentsRoutes");
app.use("/api/appointments", authMiddleware, appointmentsRoutes);