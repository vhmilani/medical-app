import { API_URL } from "../config/api";

export const getAppointments = async (token) => {
  try {
    const response = await fetch(`${API_URL}/appointments`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
  }
};

export const createAppointment = async (token, appointmentData) => {
  try {
    const response = await fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appointmentData),
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao agendar consulta:", error);
  }
};

export const confirmAppointment = async (token, appointmentId) => {
  try {
    const response = await fetch(`${API_URL}/appointments/${appointmentId}/confirm`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}` },
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao confirmar consulta:", error);
  }
};

export const cancelAppointment = async (token, appointmentId) => {
  try {
    const response = await fetch(`${API_URL}/appointments/${appointmentId}/cancel`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}` },
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao cancelar consulta:", error);
  }
};
