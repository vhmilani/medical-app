import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function DoctorProfileScreen({ navigation }) {
  const [name, setName] = useState('Dr. João Henrique');
  const [crm, setCrm] = useState('123456/SP');
  const [specialty, setSpecialty] = useState('Ortopedia');
  const [location, setLocation] = useState('Hospital São Paulo');
  const [available, setAvailable] = useState(true);

  const handleSaveProfile = () => {
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil do Médico</Text>
      
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      
      <Text style={styles.label}>CRM:</Text>
      <TextInput
        style={styles.input}
        value={crm}
        onChangeText={setCrm}
      />
      
      <Text style={styles.label}>Especialidade:</Text>
      <TextInput
        style={styles.input}
        value={specialty}
        onChangeText={setSpecialty}
      />
      
      <Text style={styles.label}>Local de Atendimento:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Disponível para Consultas:</Text>
        <Switch
          value={available}
          onValueChange={setAvailable}
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>

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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
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
