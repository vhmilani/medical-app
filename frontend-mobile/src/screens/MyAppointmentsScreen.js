import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useGlobal } from '../context/GlobalContext';
import { getAppointments } from '../services/appointmentService';
import { getDoctors } from '../services/doctorService';
import { updateAppointment } from '../services/appointmentService';

export default function MyAppointmentsScreen({ navigation }) {
  const { user, token } = useGlobal();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsData = await getAppointments(user.id, token);

        const fullData = await Promise.all(
          appointmentsData.map(async (appointment) => {
            const doctorInfo = await getDoctors(appointment.doctorId);
            return {
              ...appointment,
              doctorName: doctorInfo ? doctorInfo.name : "Médico não encontrado",
              doctorSpecialty: doctorInfo ? doctorInfo.specialty : "Especialidade não encontrada",
            };
          })
        );

        setAppointments(fullData);
      } catch (error) {
        console.error("Erro ao buscar consultas e médicos", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#007AFF" />;

  const handleUpdateStatus = async (id, newStatus) => {
    Alert.alert(
      "Cancelar consulta",
      "Tem certeza que deseja cancelar esta consulta?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            try {
              await updateAppointment(id, newStatus, token);
              Alert.alert("Sucesso", "Consulta cancelada.");
              setAppointments(appointments.map(appointment =>
                appointment._id === id ? { ...appointment, status: newStatus } : appointment
              ));
            } catch (error) {
              Alert.alert("Erro", "Não foi possível atualizar o status da consulta.");
            }
          }
        }
      ]
    );
  };

  const handleReschedule = (id) => {
    Alert.alert("Reagendar", "Função de reagendamento ainda não implementada.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Consultas</Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.doctorName} ({item.status})</Text>
            <Text style={styles.cardSubtitle}>{item.doctorSpecialty}</Text>
            <Text style={styles.cardDetails}>{item.date} às {item.time}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => handleUpdateStatus(item._id, "cancelado")}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rescheduleButton} onPress={() => handleReschedule(item._id)}>
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
