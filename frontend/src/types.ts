export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'coordinator' | 'speaker';
}

export interface Proposal {
  id: string;
  title: string;
  abstract: string;
  speaker: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AppState {
  user: User | null;
  proposals: Proposal[];
  loading: boolean;
  error: string | null;
}