import { UserRole } from '../types/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResult {
  success: boolean;
  role?: UserRole;
  error?: string;
}

export const authService = {
  validateCredentials: (credentials: LoginCredentials): LoginResult => {
    const { email, password } = credentials;

    if (email === 'user@example.com' && password === '123') {
      return { success: true, role: 'user' };
    }
    
    if (email === 'admin@example.com' && password === 'admin') {
      return { success: true, role: 'admin' };
    }

    return { success: false, error: 'Email ou senha incorretos' };
  },
};