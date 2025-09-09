import { LoginCredentials, LoginResponse, User, UserRole } from '../types/auth';
import { API_CONFIG } from '../config/api';

interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResult> => {
    try {
      console.log('Tentando login com:', credentials);
      console.log('URL:', `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SIGNIN}`);
      
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SIGNIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        return { success: false, error: `Erro ${response.status}: ${errorText}` };
      }

      const data: LoginResponse = await response.json();
      console.log('Login response:', data);
      
      // Determinar role baseado no username (temporário)
      const role: UserRole = data.username === 'admin' ? 'admin' : 'user';
      
      const user: User = {
        username: data.username,
        role,
        token: data.accessToken,
      };

      console.log('User created:', user);
      return { success: true, user };
    } catch (error) {
      console.log('Login error:', error);
      return { success: false, error: `Erro de conexão: ${error}` };
    }
  },

  testEndpoint: async (endpoint: string, token: string): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/test/${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return { success: false, error: 'Acesso negado' };
      }

      const data = await response.text();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Erro de conexão' };
    }
  },
};