import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../constants/routes';
import { styles } from './UserPage.styles';

export function UserPage() {
  const { user, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace(ROUTES.LOGIN);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!user) {
    router.replace(ROUTES.LOGIN);
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (user.role === 'admin') {
    router.replace(ROUTES.ADMIN);
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do Usuário</Text>
      <Text style={styles.welcome}>Bem-vindo, {user.email}</Text>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}