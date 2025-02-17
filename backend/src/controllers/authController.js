const User = require("../models/User");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password, role, name, phone, crm, specialty } = req.body;

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email já cadastrado" });

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário
    if (role === "patient") {
      const newPatient = new Patient({ email, password: hashedPassword, role, name, phone });
      await newPatient.save();
    }

    if (role === "doctor") {
      const newDoctor = new Doctor({ email, password: hashedPassword, role, name, phone, crm, specialty });
      await newDoctor.save();
    }

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário pelo email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    // Compara a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Credenciais inválidas" });

    // Gera o token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login", error });
  }
};
