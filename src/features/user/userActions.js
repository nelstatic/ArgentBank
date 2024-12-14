import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action asynchrone pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile", // Identifiant de l'action
  async (token, { rejectWithValue }) => {
    try {
      // Effectuer l'appel API directement ici pour récupérer le profil utilisateur
      const response = await axios.get(
        "http://localhost:3001/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête de la requête
          },
        }
      );

      // Vérification de la structure de la réponse
      if (response.data.body) {
        // Retourner uniquement les données utilisateur (body)
        return response.data.body; // Cela renverra les données utilisateur comme on le souhaite
      } else {
        throw new Error("No user data found");
      }
    } catch (error) {
      // Gérer les erreurs et retourner un message d'erreur
      return rejectWithValue(error.message);
    }
  }
);
