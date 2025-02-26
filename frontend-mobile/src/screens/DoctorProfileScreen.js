import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useGlobal } from '../context/GlobalContext';
import { getDoctors } from '../services/doctorService';

export default function DoctorProfileScreen({ navigation }) {
  const { user } = useGlobal();
  const [userData, setUserData] = useState([]);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getDoctors(user.id);
      setUserData(data);
    };
    fetchUserData();
  }, []);

  const handleSaveProfile = () => {
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil do Médico</Text>
      
      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={userData.name} onChangeText={setUserData.name} />
  
      <Text style={styles.label}>CPF</Text>
      <TextInput style={styles.input} value={userData.cpf} editable={false} />
      
      <Text style={styles.label}>CRM:</Text>
      <TextInput style={styles.input} value={userData.crm} onChangeText={setUserData.crm} />
      
      <Text style={styles.label}>Especialidade:</Text>
      <TextInput style={styles.input} value={userData.specialty} onChangeText={setUserData.specialty} />

      <Text style={styles.label}>E-mail</Text>
      <TextInput style={styles.input} value={userData.email} editable={false} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput style={styles.input} value={userData.phone} editable={setUserData.phone} />

      <Text style={styles.label}>Nova Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova senha"
        secureTextEntry
        onChangeText={setUserData.password}
      />
      
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Disponível para Consultas:</Text>
        <Switch value={available} onValueChange={setAvailable} />
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>

      {/* Botão de Voltar na parte inferior */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DoctorHome')}>
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
  saveButton: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
});
