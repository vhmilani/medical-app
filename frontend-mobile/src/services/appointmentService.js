import axios from 'axios';
import { API_URL } from "../config/api";

export const createAppointment = async (appointmentData, token) => {
  try {
     const response = await fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      throw new Error(appointmentData.message || "Erro ao criar consulta.");
    }

    return { success: true, appointmentData };
    
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateAppointment = async (appointmentId, status, token) => {
  try {
    const response = await axios.put(`${API_URL}/appointments/update/${appointmentId}`, 
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar status da consulta:", error.response?.data || error.message);
    throw error;
  }
};


export const getAppointments = async ( userId, token ) => {
  try {
    const response = await axios.get(`${API_URL}/appointments/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar consultas:", error.response?.data || error.message);
    throw error;
  }
};

export const getDoctorAppointments = async ( doctorId, token ) => {
  try {
    const response = await axios.get(`${API_URL}/appointments/doctor/${doctorId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar consultas:", error.response?.data || error.message);
    throw error;
  }
};