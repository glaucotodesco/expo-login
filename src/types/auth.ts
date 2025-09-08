export type UserRole = 'user' | 'admin';

export interface User {
  email: string;
  role: UserRole;
}

export type AuthUser = User | null;