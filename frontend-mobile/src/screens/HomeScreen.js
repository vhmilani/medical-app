import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useGlobal } from '../context/GlobalContext';

const specialties = ['Cardiologia', 'Dermatologia', 'Ortopedia', 'Pediatria', 'Psiquiatria'];
const doctors = [
  { id: '1', name: 'Dra. Renata Oliveira', specialty: 'Cardiologia' },
  { id: '2', name: 'Dr. João Henrique', specialty: 'Ortopedia' },
  { id: '3', name: 'Dra. Marina Souza', specialty: 'Pediatria' },
];

export default function HomeScreen({ navigation }) {
  const { role } = useGlobal();
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const filteredDoctors = selectedSpecialty
    ? doctors.filter((doctor) => doctor.specialty === selectedSpecialty)
    : doctors;

  const handleDoctorSelection = (doctor) => {
    if (selectedDoctor?.id === doctor.id) {
      setSelectedDoctor(null);
    } else {
      setSelectedDoctor(doctor);
    }
  };

  const handleAppointment = () => {
    if (!selectedDoctor) {
      alert('Por favor, selecione um médico.');
      return;
    }
    navigation.navigate('Appointment', { doctor: selectedDoctor });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Agende sua consulta</Text>

      {/* Dropdown de Especialidades */}
      <Text style={styles.sectionTitle}>Selecione a Especialidade</Text>
      <Picker
        selectedValue={selectedSpecialty}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedSpecialty(itemValue)}
      >
        <Picker.Item label="Todas" value="" />
        {specialties.map((specialty) => (
          <Picker.Item key={specialty} label={specialty} value={specialty} />
        ))}
      </Picker>

      {/* Lista de Médicos */}
      <Text style={styles.sectionTitle}>Médicos Disponíveis</Text>
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, selectedDoctor?.id === item.id && styles.selectedCard]}
            onPress={() => handleDoctorSelection(item)}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.specialty}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Botões de Atalho */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAppointment}
        >
          <Text style={styles.buttonText}>Agendar Consulta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyAppointments')}>
          <Text style={styles.buttonText}>Minhas Consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PatientProfile')}>
          <Text style={styles.buttonText}>Meu Perfil</Text>
        </TouchableOpacity>
        {role === 'doctor' && (
          <TouchableOpacity style={styles.docToPatButton} onPress={() => navigation.navigate('DoctorHome')}>
            <Text style={styles.docToPatButtonText}>Acessar como Médico</Text>
          </TouchableOpacity>
        )}
      </View>

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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedCard: {
    backgroundColor: '#cce5ff',
    borderWidth: 2,
    borderColor: '#007BFF',
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
