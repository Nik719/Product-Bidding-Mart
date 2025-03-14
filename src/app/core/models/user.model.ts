export interface User {
  id?: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  lastLogin?: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  role: 'buyer' | 'seller';
}