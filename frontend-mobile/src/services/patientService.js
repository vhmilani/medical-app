import axios from "axios";
import { API_URL } from "../config/api";

// Função para buscar os médicos disponíveis
export const getPatients = async (patientID = null) => {
    try {
        const url = patientID ? `${API_URL}/patients/${patientID}` : `${API_URL}/patients`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar médicos:", error.response?.data || error.message);
        return [];
    }
};
