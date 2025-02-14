const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["patient", "doctor"], required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true},
  crm: { type: String, required: function() { return this.role === "doctor"; } },
  specialty: { type: String, required: function() { return this.role === "doctor"; } },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
