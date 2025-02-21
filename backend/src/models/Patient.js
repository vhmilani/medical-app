const mongoose = require("mongoose");
const User = require("./User");

const Patient = User.discriminator("patient",
    new mongoose.Schema({
        name: { type: String, required: true },
        phone: { type: String, required: true },
    }), { timestamps: true });

module.exports = Patient;