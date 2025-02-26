import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useGlobal } from '../context/GlobalContext';
import { getDoctorAppointments } from '../services/appointmentService';
import { getUsers } from '../services/userService';
import { updateAppointment } from '../services/appointmentService';

export default function DoctorAppointmentsScreen({ navigation }) {
  const { user, token } = useGlobal();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsData = await getDoctorAppointments(user.id, token);

        const fullData = await Promise.all(
          appointmentsData.map(async (appointment) => {
            const userInfo = await getUsers(appointment.userId);
            return {
              ...appointment,
              userName: userInfo ? userInfo.name : "Paciente não encontrado",
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
      newStatus === "confirmado" ? "Confirmar consulta" : "Cancelar consulta",
      newStatus === "confirmado" ? "Tem certeza que deseja confirmar esta consulta?" : "Tem certeza que deseja cancelar esta consulta?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            try {
              await updateAppointment(id, newStatus, token);
              Alert.alert("Sucesso", newStatus === "confirmado" ? "Consulta confirmada." : "Consulta cancelada.");
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minha Agenda</Text>
      
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.userName}</Text>
            <Text style={styles.cardSubtitle}>{item.time} - {item.status}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.statusButton} onPress={() => handleUpdateStatus(item._id, 'confirmado')}>
                <Text style={styles.statusText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.statusButton, styles.cancelButton]} onPress={() => handleUpdateStatus(item._id, 'cancelado')}>
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
