import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function UserPage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Área do Usuário
      </Text>
      <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 40, color: '#666' }}>
        Bem-vindo à área do usuário comum
      </Text>
      
      <TouchableOpacity 
        style={{ backgroundColor: '#dc3545', padding: 15, borderRadius: 8 }}
        onPress={() => router.replace('/')}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}