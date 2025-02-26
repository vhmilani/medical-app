import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";
import { registerUser } from "../services/authService";

export default function RegisterPatientScreen({ route, navigation }) {
  const { email, password, role } = route.params;
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const userData = { email, password, role, name, cpf, phone };

  const handleRegister = async () => {
    const response = await registerUser(userData);

    if (response.success) {
      alert('Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } else {
      alert(response.message);
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Paciente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />

      <MaskedTextInput
        style={styles.input}
        placeholder="CPF"
        keyboardType="numeric"
        mask="999.999.999-99"
        maxLength={14}
        value={cpf}
        onChangeText={setCpf}
      />

      <MaskedTextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="numeric"
        mask="(99) 99999-9999"
        maxLength={15}
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Finalizar Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 15,
    color: '#007BFF',
  },
});
