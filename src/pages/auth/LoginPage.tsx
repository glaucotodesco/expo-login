import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/authService';
import { ROUTES } from '../../constants/routes';
import { styles } from './LoginPage.styles';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { user, isLoading, login } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(user.role === 'admin' ? ROUTES.ADMIN : ROUTES.USER);
    }
  }, [user, isLoading]);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    
    console.log('Iniciando login...');
    setIsLoggingIn(true);
    
    try {
      const result = await authService.login({ username, password });
      console.log('Resultado do login:', result);
      
      if (result.success && result.user) {
        console.log('Login bem-sucedido, salvando usuário...');
        await login(result.user);
        console.log('Usuário salvo com sucesso');
      } else {
        console.log('Falha no login:', result.error);
        Alert.alert('Erro', result.error || 'Erro desconhecido');
      }
    } catch (error) {
      console.log('Erro durante login:', error);
      Alert.alert('Erro', 'Erro inesperado durante o login');
    }
    
    setIsLoggingIn(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={[styles.button, isLoggingIn && { opacity: 0.7 }]} 
        onPress={handleLogin}
        disabled={isLoggingIn}
      >
        <Text style={styles.buttonText}>{isLoggingIn ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.testButton]} 
        onPress={async () => {
          try {
            console.log('Testando conexão...');
            const response = await fetch('http://localhost:8080/api/test/all');
            console.log('Status da resposta:', response.status);
            const text = await response.text();
            console.log('Resposta do servidor:', text);
            Alert.alert('Teste', `Status: ${response.status}\nResposta: ${text}`);
          } catch (error) {
            console.log('Erro no teste:', error);
            Alert.alert('Erro', `Erro de conexão: ${error}`);
          }
        }}
      >
        <Text style={styles.testButtonText}>Testar Servidor</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.testButton]} 
        onPress={async () => {
          try {
            const response = await fetch('http://localhost:8080/api/test/user');
            const text = await response.text();
            Alert.alert('Endpoint User', `Status: ${response.status}\nResposta: ${text}`);
          } catch (error) {
            Alert.alert('Erro', `Erro: ${error}`);
          }
        }}
      >
        <Text style={styles.testButtonText}>Testar User (sem token)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.testButton]} 
        onPress={async () => {
          try {
            const response = await fetch('http://localhost:8080/api/test/admin');
            const text = await response.text();
            Alert.alert('Endpoint Admin', `Status: ${response.status}\nResposta: ${text}`);
          } catch (error) {
            Alert.alert('Erro', `Erro: ${error}`);
          }
        }}
      >
        <Text style={styles.testButtonText}>Testar Admin (sem token)</Text>
      </TouchableOpacity>
    </View>
  );
}