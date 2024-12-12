import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "./userProfileApi"; // Importation de l'API pour récupérer le profil

// Action asynchrone pour récupérer le profil utilisateur
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue, getState }) => {
    const { token } = getState().auth; // Récupère le token d'authentification dans l'état Redux
    try {
      const response = await getUserProfile(token); // Appel API pour récupérer le profil utilisateur
      return response.data; // Retourne les données de profil
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
