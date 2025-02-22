import axios from 'axios';
import { API_URL } from "../config/api";

export const sendMessageToChatbot = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/chatbot`, { message });
    return response.data.response;
  } catch (error) {
    console.error('Erro ao enviar mensagem para o chatbot:', error);
    return 'Erro ao conectar com o chatbot. Tente novamente mais tarde.';
  }
};
