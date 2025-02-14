const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    const newAppointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date
    });

    await newAppointment.save();
    res.status(201).json({ message: "Consulta agendada com sucesso!" });

  } catch (error) {
    res.status(500).json({ message: "Erro ao agendar consulta", error });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "patient") {
      filter.patient = req.user.id;
    } else if (req.user.role === "doctor") {
      filter.doctor = req.user.id;
    }

    const appointments = await Appointment.find(filter).populate("doctor patient", "name email");
    res.json(appointments);

  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar consultas", error });
  }
};

exports.confirmAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: "Consulta não encontrada." });

    if (req.user.role !== "doctor" || req.user.id !== appointment.doctor.toString()) {
      return res.status(403).json({ message: "Apenas o médico pode confirmar a consulta." });
    }

    appointment.status = "confirmado";
    await appointment.save();

    res.json({ message: "Consulta confirmada com sucesso!", appointment });
  } catch (error) {
    res.status(500).json({ message: "Erro ao confirmar consulta", error });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: "Consulta não encontrada." });

    if (req.user.id !== appointment.patient.toString() && req.user.id !== appointment.doctor.toString()) {
      return res.status(403).json({ message: "Apenas o paciente ou o médico podem cancelar esta consulta." });
    }

    appointment.status = "cancelado";
    await appointment.save();

    res.json({ message: "Consulta cancelada com sucesso!", appointment });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cancelar consulta", error });
  }
};
