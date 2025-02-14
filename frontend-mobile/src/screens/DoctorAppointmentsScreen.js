import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const initialAppointments = [
  { id: '1', patient: 'Carlos Souza', time: '08:00', status: 'Pendente' },
  { id: '2', patient: 'Ana Clara', time: '10:30', status: 'Confirmado' },
  { id: '3', patient: 'Lucas Ferreira', time: '14:00', status: 'Pendente' },
];

export default function DoctorAppointmentsScreen({ navigation }) {
  const [appointments, setAppointments] = useState(initialAppointments);

  const handleChangeStatus = (id, newStatus) => {
    setAppointments(appointments.map((appt) =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minha Agenda</Text>
      
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.patient}</Text>
            <Text style={styles.cardSubtitle}>{item.time} - {item.status}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.statusButton} onPress={() => handleChangeStatus(item.id, 'Confirmado')}>
                <Text style={styles.statusText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.statusButton, styles.cancelButton]} onPress={() => handleChangeStatus(item.id, 'Cancelado')}>
                <Text style={styles.statusText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

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
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    backgroundColor: '#28A745',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#DC3545',
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
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
