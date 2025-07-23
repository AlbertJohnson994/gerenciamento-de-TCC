import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  name: string;
  role: 'student' | 'coordinator' | '';
  roleNumber: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  email: '',
  name: '',
  role: '',
  roleNumber: '',
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; name: string; role: 'student' | 'coordinator' }>) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.email = '';
      state.name = '';
      state.role = '';
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
