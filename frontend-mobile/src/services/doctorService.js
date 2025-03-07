import axios from "axios";
import { API_URL } from "../config/api";

// Função para buscar os médicos disponíveis
export const getDoctors = async (doctorID = null) => {
    try {
        const url = doctorID ? `${API_URL}/doctors/${doctorID}` : `${API_URL}/doctors`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar médicos:", error.response?.data || error.message);
        return [];
    }
};
