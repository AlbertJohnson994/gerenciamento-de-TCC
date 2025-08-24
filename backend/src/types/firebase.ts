export interface User {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'ORIENTADOR' | 'ADMIN' | 'COORDENADOR';
  matriculation?: string;
  course?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  author: string;
  advisor: string;
  abstract: string;
  keywords: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVISION';
  feedback?: string;
  deadline?: Date;
  studentId: string;
  orientadorId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const COLLECTIONS = {
  USERS: 'users',
  PROPOSALS: 'proposals'
} as const;