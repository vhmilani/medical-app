import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useGlobal } from '../context/GlobalContext';
import { useNavigation } from '@react-navigation/native';
import { sendMessageToChatbot } from '../services/chatbotService';

export default function ChatbotScreen({ navigation }) {

  const [messages, setMessages] = useState('');
  const [inputText, setInputText] = useState('');

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInputText('');

    try {
      const botResponse = await sendMessageToChatbot(inputText);
      const botMessage = { id: Date.now() + 1, text: botResponse, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = { id: Date.now() + 2, text: 'Erro ao se conectar ao chatbot.', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

  };

  const { previousScreen, setPreviousScreen } = useGlobal();
  const navState = useNavigation().getState();

  useEffect(() => {
    if (navState.routes.length > 1) {
      const lastScreen = navState.routes[navState.index - 1]?.name;
      setPreviousScreen(lastScreen);
    }
  }, []);

  const handlePreviousScreen = () => {
    if (previousScreen === 'Appointment') {
      navigation.navigate('Home');
      return;
    }
    navigation.navigate(previousScreen);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatbot Assistente</Text>

      {/* Lista de mensagens */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        style={styles.chatArea}
      />

      {/* Campo de entrada de mensagem */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={handlePreviousScreen}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chatArea: {
    flex: 1,
    marginBottom: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007BFF',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ddd',
  },
  messageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  sendButton: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
