export type UserRole = 'user' | 'admin';

export interface User {
  username: string;
  role: UserRole;
  token: string;
}

export type AuthUser = User | null;

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  id: number;
  username: string;
  roles: string[];
}