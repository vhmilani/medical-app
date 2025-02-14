import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const appointments = [
  { id: '1', patient: 'Carlos Souza', time: '08:00', status: 'Pendente' },
  { id: '2', patient: 'Ana Clara', time: '10:30', status: 'Confirmado' },
  { id: '3', patient: 'Lucas Ferreira', time: '14:00', status: 'Pendente' },
];

export default function DoctorHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo, Doutor!</Text>
      <Text style={styles.subHeader}>Resumo do Dia</Text>
      <Text style={styles.summaryText}>Consultas Agendadas: {appointments.length}</Text>

      <Text style={styles.sectionTitle}>Próximas Consultas</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PatientDetails')}>
            <Text style={styles.cardTitle}>{item.patient}</Text>
            <Text style={styles.cardSubtitle}>{item.time} - {item.status}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DoctorAppointments')}>
          <Text style={styles.buttonText}>Minha Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DoctorProfile')}>
          <Text style={styles.buttonText}>Meu Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DoctorDocuments')}>
          <Text style={styles.buttonText}>Emissão de Documentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.docToPatButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.docToPatButtonText}>Acessar como Paciente</Text>
        </TouchableOpacity>
      </View>

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
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
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
  docToPatButton: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  docToPatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
