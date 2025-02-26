import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useGlobal } from '../context/GlobalContext';
import { getDoctors } from '../services/doctorService';

export default function HomeScreen({ navigation }) {
  const { user } = useGlobal();
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
        const data = await getDoctors();
        setDoctors(data);
        setLoading(false);
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = selectedSpecialty
    ? doctors.filter((doctor) => doctor.specialty === selectedSpecialty)
    : doctors;

  const handleDoctorSelection = (doctor) => {
    if (selectedDoctor?._id === doctor._id) {
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
        {[...new Set(doctors.map((d) => d.specialty))].map((specialty) => (
          <Picker.Item key={specialty} label={specialty} value={specialty} />
        ))}
      </Picker>

      {/* Lista de Médicos */}
      <Text style={styles.sectionTitle}>Médicos Disponíveis</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={filteredDoctors.filter(doctor => doctor._id !== user.id)}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.card, selectedDoctor?._id === item._id && styles.selectedCard]}
                onPress={() => handleDoctorSelection(item)}
              >
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.specialty}</Text>
              </TouchableOpacity>
          )}
        />
      )}

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
        {user.role === 'doctor' && (
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
