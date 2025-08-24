import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authService";
import type { LoginData, RegisterData, User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Get initial state from localStorage
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken,
  isLoading: false,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginData, { rejectWithValue }) => {
    try {
      return await authService.login(credentials);
    } catch (error: unknown) {
      let message = "Erro no login";
      interface ErrorWithResponse {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        (error as ErrorWithResponse).response?.data?.message
      ) {
        message = (error as ErrorWithResponse).response!.data!.message!;
      }
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      return await authService.register(data);
    } catch (error: unknown) {
      let message = "Erro no registro";
      interface ErrorWithResponse {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        (error as ErrorWithResponse).response?.data?.message
      ) {
        message = (error as ErrorWithResponse).response!.data!.message!;
      }
      return rejectWithValue(message);
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getMe();
    } catch (error: unknown) {
      let message = "Erro ao carregar usuário";
      interface ErrorWithResponse {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        (error as ErrorWithResponse).response?.data?.message
      ) {
        message = (error as ErrorWithResponse).response!.data!.message!;
      }
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      authService.logout();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // GetMe
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
