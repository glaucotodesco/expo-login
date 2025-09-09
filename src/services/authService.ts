import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { LoginCredentials, LoginResponse, User, UserRole } from '../types/auth';

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
      
      const response = await axios.post<LoginResponse>(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SIGNIN}`,
        credentials
      );

      console.log('Response status:', response.status);
      console.log('Login response:', response.data);
      
      // Map backend roles to UserRole array
      const roles: UserRole[] = response.data.roles?.map(role => 
        role === 'ROLE_ADMIN' ? 'admin' as UserRole : 'user' as UserRole
      ) || ['user'];
      
      const user: User = {
        username: response.data.username,
        roles,
        token: response.data.accessToken,
      };

      console.log('User created:', user);
      return { success: true, user };
    } catch (error) {
      console.log('Login error:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data || error.message;
        return { success: false, error: `Erro ${error.response?.status}: ${errorMessage}` };
      }
      return { success: false, error: `Erro de conexão: ${error}` };
    }
  },

  testEndpoint: async (endpoint: string, token: string): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}/test/${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return { success: true, data: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { success: false, error: error.response?.status === 401 ? 'Acesso negado' : 'Erro na requisição' };
      }
      return { success: false, error: 'Erro de conexão' };
    }
  },
};