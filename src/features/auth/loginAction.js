import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "./loginApi"; // Cette API effectue la connexion avec le backend

// Action asynchrone pour la connexion
export const loginUser = createAsyncThunk(
  "auth/login", // Identifiant de l'action
  async (credentials, { rejectWithValue }) => {
    try {
      // Envoie des informations de connexion à l'API
      const response = await loginApi(credentials);
      const { token, user } = response.data;

      // Retourner les informations directement dans Redux
      return { token, user }; // Pas de sauvegarde dans localStorage
    } catch (error) {
      // Si une erreur survient, on la retourne
      return rejectWithValue(error.message);
    }
  }
);
