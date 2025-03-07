import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function DoctorDocumentsScreen({ navigation }) {
  const [documentType, setDocumentType] = useState('');
  const [content, setContent] = useState('');

  const handleGenerateDocument = () => {
    if (!documentType || !content) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    alert(`Documento gerado: ${documentType}\n\n${content}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emissão de Documentos</Text>
      
      <Text style={styles.label}>Tipo de Documento:</Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity 
          style={[styles.optionButton, documentType === 'Receituário' && styles.selectedButton]} 
          onPress={() => setDocumentType('Receituário')}>
          <Text style={styles.buttonText}>Receituário</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.optionButton, documentType === 'Atestado Médico' && styles.selectedButton]} 
          onPress={() => setDocumentType('Atestado Médico')}>
          <Text style={styles.buttonText}>Atestado Médico</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.optionButton, documentType === 'Declaração' && styles.selectedButton]} 
          onPress={() => setDocumentType('Declaração')}>
          <Text style={styles.buttonText}>Declaração</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.label}>Conteúdo do Documento:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={6}
        placeholder="Digite o conteúdo do documento..."
        value={content}
        onChangeText={setContent}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleGenerateDocument}>
        <Text style={styles.buttonText}>Gerar Documento</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar para Paciente</Text>
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
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  textArea: {
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
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
