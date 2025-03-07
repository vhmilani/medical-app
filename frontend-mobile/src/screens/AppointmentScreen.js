import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createAppointment } from '../services/appointmentService';
import { useGlobal } from '../context/GlobalContext';

const availableDates = ['10/02/2025', '11/02/2025', '12/02/2025'];
const availableTimes = ['08:00', '09:00', '10:30', '14:00', '16:00'];

export default function AppointmentScreen({ route, navigation }) {
  const { doctor } = route.params;
  const { user, token } = useGlobal();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);

  const handleConfirmAppointment = async () => {
      const response = await createAppointment({ userId: user.id, doctorId: doctor._id, date, time }, token);
  
      if (response.success) {
        alert("Consulta agendada com sucesso!");
        navigation.navigate('MyAppointments');
      } else {
        alert(response.message);
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Consulta</Text>

      {/* Exibir Médico Selecionado */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{doctor.name}</Text>
        <Text style={styles.cardSubtitle}>{doctor.specialty}</Text>
        <Text style={styles.cardSubtitle}>CRM/{doctor.crm}</Text>
        <Text style={styles.cardSubtitle}>Telefone: {doctor.phone}</Text>
        <Text style={styles.cardSubtitle}>Endereço:</Text>
        <Text style={styles.cardSubtitle}>Cidade:</Text>
      </View>

      {/* Botão para selecionar a Data */}
      <TouchableOpacity style={styles.selectButton} onPress={() => setDateModalVisible(true)}>
        <Text style={styles.selectButtonText}>
          {date ? date : 'Selecionar Data'}
        </Text>
      </TouchableOpacity>

      {/* Modal de Datas */}
      <Modal visible={dateModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={availableDates}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setDate(item);
                    setDateModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setDateModalVisible(false)}>
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Botão para selecionar o Horário */}
      <TouchableOpacity style={styles.selectButton} onPress={() => setTimeModalVisible(true)}>
        <Text style={styles.selectButtonText}>
          {time ? time : 'Selecionar Horário'}
        </Text>
      </TouchableOpacity>

      {/* Modal de Horários */}
      <Modal visible={timeModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={availableTimes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setTime(item);
                    setTimeModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setTimeModalVisible(false)}>
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Botão de Confirmação */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmAppointment}>
        <Text style={styles.confirmButtonText}>Confirmar Consulta</Text>
      </TouchableOpacity>

      {/* Botão de Voltar */}
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
  selectedCard: {
    backgroundColor: '#007BFF',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  selectButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalText: {
    fontSize: 16,
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: 'transparent',
    padding: 5,
  },
  closeButtonText: {
    fontSize: 16,
  },
});

