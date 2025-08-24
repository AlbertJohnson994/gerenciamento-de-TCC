export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ORIENTADOR' | 'ADMIN';
  createdAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'ORIENTADOR' | 'ADMIN';
  matriculation: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Proposal {
  id: string;
  title: string;
  author: string;
  advisor: string;
  abstract: string;
  keywords: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVISION';
  feedback?: string;
  studentId: string;
  createdAt: string;
  updatedAt: string;
  student?: User;
}