// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "./loginApi"; // Assurez-vous d'importer l'API correctement

// Async thunk pour l'authentification
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials); // Appel API pour la connexion
      const { token, user } = response.data;

      // Sauvegarder le token et les informations utilisateur dans le store
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isLogged: false,
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isLogged = false;
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Mise à jour du token
        state.isLogged = true; // Mise à jour du statut de connexion
        state.userInfo = action.payload.user; // Mise à jour des infos utilisateur
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
