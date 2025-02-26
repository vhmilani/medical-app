import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const patientData = {
  name: 'Carlos Souza',
  age: 45,
  contact: '(11) 99999-9999',
  conditions: ['Hipertensão', 'Diabetes Tipo 2'],
};

const appointmentHistory = [
  { id: '1', date: '10/01/2025', time: '08:00', status: 'Realizada' },
  { id: '2', date: '15/02/2025', time: '09:30', status: 'Agendada' },
];

export default function PatientDetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do Paciente</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{patientData.name}</Text>
        <Text style={styles.cardSubtitle}>Idade: {patientData.age} anos</Text>
        <Text style={styles.cardSubtitle}>Contato: {patientData.contact}</Text>
        <Text style={styles.cardSubtitle}>Condições: {patientData.conditions.join(', ')}</Text>
      </View>

      <Text style={styles.sectionTitle}>Histórico de Consultas</Text>
      <FlatList
        data={appointmentHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyCard}>
            <Text style={styles.cardTitle}>{item.date} - {item.time}</Text>
            <Text style={styles.cardSubtitle}>Status: {item.status}</Text>
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ligar para Paciente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar Mensagem</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de Voltar na parte inferior */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('DoctorHome')}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {/* Botão Flutuante para o Chatbot */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('Chatbot')}>
        <AntDesign name="message1" size={24} color="white" />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  historyCard: {
    backgroundColor: '#e8e8e8',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
