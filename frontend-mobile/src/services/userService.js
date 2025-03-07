import axios from "axios";
import { API_URL } from "../config/api";

// Função para buscar usuários
export const getUsers = async (userID = null) => {
    try {
        const url = userID ? `${API_URL}/users/${userID}` : `${API_URL}/users`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar médicos:", error.response?.data || error.message);
        return [];
    }
};
