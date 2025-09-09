import { StyleSheet } from 'react-native';

const baseButton = {
  padding: 15,
  borderRadius: 8,
  marginBottom: 10,
};

const baseButtonText = {
  color: '#fff',
  textAlign: 'center' as const,
  fontSize: 16,
  fontWeight: 'bold' as const,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  button: {
    ...baseButton,
    backgroundColor: '#007bff',
  },
  buttonText: baseButtonText,
  logoutButton: {
    ...baseButton,
    backgroundColor: '#dc3545',
    marginBottom: 0,
  },
  logoutButtonText: baseButtonText,
  testResult: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#28a745',
  },
});