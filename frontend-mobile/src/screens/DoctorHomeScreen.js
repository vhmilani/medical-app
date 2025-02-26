import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useGlobal } from '../context/GlobalContext';
import { getDoctorAppointments } from '../services/appointmentService';
import { getUsers } from '../services/userService';

export default function DoctorHomeScreen({ navigation }) {
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo, Doutor!</Text>
      <Text style={styles.subHeader}>Resumo do Dia</Text>
      <Text style={styles.summaryText}>Consultas Agendadas: {appointments.length}</Text>

      <Text style={styles.sectionTitle}>Próximas Consultas</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PatientDetails')}>
            <Text style={styles.cardTitle}>{item.userName}</Text>
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
