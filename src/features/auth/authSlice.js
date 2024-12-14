import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./loginAction"; // Assurez-vous d'importer l'action de connexion

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
        state.loading = true; // Pendant la requête, l'état est en chargement
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Mise à jour du token récupéré
        state.isLogged = true; // Marquer l'utilisateur comme connecté
        state.userInfo = action.payload.user; // Sauvegarder les informations utilisateur
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Gestion des erreurs
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
