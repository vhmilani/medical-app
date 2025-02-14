import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getAppointments, confirmAppointment, cancelAppointment } from "../services/appointmentService";

export default function MyAppointmentsScreen({ route }) {
  const { token } = route.params;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const response = await getAppointments(token);
    setAppointments(response);
  };

  const handleConfirm = async (id) => {
    await confirmAppointment(token, id);
    fetchAppointments();
  };

  const handleCancel = async (id) => {
    await cancelAppointment(token, id);
    fetchAppointments();
  };

  const handleReschedule = (id) => {
    Alert.alert("Reagendar", "Função de reagendamento ainda não implementada.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Consultas</Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.doctor}</Text>
            <Text style={styles.cardSubtitle}>{item.specialty}</Text>
            <Text style={styles.cardDetails}>{item.date} às {item.time}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel(item.id)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rescheduleButton} onPress={() => handleReschedule(item.id)}>
                <Text style={styles.buttonText}>Reagendar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Botão de Voltar na parte inferior */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
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
  title: {
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
  cardDetails: {
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  rescheduleButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
});
