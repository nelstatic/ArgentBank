import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action asynchrone pour la connexion
export const loginUser = createAsyncThunk(
  "auth/login", // Identifiant de l'action
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Effectuer l'appel API directement ici avec le format attendu par l'API
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login", // URL de connexion
        {
          email, // Corps de la requête respectant la structure de l'API
          password, // Corps de la requête respectant la structure de l'API
        }
      );

      // Vérification que la réponse est valide, et extraction des données
      const { token, user } = response.data.body; // Accès aux données spécifiques de la réponse
      return { token, user }; // Retourne ces données comme payload dans l'action
    } catch (error) {
      console.error("Error during login request:", error);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
