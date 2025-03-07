const mongoose = require("mongoose");
const User = require("./User");

const Doctor = User.discriminator("doctor",
    new mongoose.Schema({
        crm: { type: String, required: true },
        specialty: { type: String, required: true },
    }), { timestamps: true });

module.exports = Doctor;