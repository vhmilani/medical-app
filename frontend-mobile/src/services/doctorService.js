import axios from "axios";
import { API_URL } from "../config/api";

// Função para buscar os médicos disponíveis
export const getDoctors = async () => {
    try {
        const response = await axios.get(`${API_URL}/doctors`);
        return response.data;
    } catch (error) {
        console.error("doctorService. js - Erro ao buscar médicos:", error.response?.data || error.message);
        return [];
    }
};
