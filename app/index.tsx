import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from 'expo-router';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    
    // Usuário comum
    if (email === 'user@example.com' && password === '123') {
      router.replace('/user');
    }
    // Administrador
    else if (email === 'admin@example.com' && password === 'admin') {
      router.replace('/admin');
    }
    else {
      Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 }}>Login</Text>
      
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ddd', padding: 15, marginBottom: 15, borderRadius: 8 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={{ borderWidth: 1, borderColor: '#ddd', padding: 15, marginBottom: 15, borderRadius: 8 }}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={{ backgroundColor: '#007AFF', padding: 15, borderRadius: 8 }}
        onPress={handleLogin}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
