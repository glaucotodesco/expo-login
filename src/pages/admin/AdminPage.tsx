import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import { ROUTES } from '../../constants/routes';
import { styles } from './AdminPage.styles';

export function AdminPage() {
  const { user, logout } = useAuth();
  const [testResult, setTestResult] = useState<string>('');

  const handleLogout = async () => {
    await logout();
    router.replace(ROUTES.LOGIN);
  };

  const handleTestEndpoint = async (endpoint: 'admin' | 'user') => {
    if (!user) return;
    const result = await authService.testEndpoint(endpoint, user.token);
    if (result.success) {
      setTestResult(result.data);
    } else {
      Alert.alert('Erro', result.error);
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do Administrador</Text>
      <Text style={styles.welcome}>Bem-vindo, {user.username}</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleTestEndpoint('admin')}
      >
        <Text style={styles.buttonText}>Testar Endpoint Admin</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => handleTestEndpoint('user')}
      >
        <Text style={styles.buttonText}>Testar Endpoint User</Text>
      </TouchableOpacity>
      
      {testResult && (
        <Text style={styles.testResult}>{testResult}</Text>
      )}
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}