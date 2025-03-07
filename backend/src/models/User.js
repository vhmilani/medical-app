const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor"], required: true },
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  phone: { type: String, required: true },
}, { discriminatorKey: "role", timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;