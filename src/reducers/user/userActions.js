import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.body; // Retour des données utilisateur
    } catch (error) {
      return rejectWithValue("Failed to fetch user profile");
    }
  }
);

export const userEditAction = createAsyncThunk(
  "user/editUserProfile",
  async ({ token, updatedData }, { rejectWithValue }) => {
    try {
      console.log("Données envoyées pour édition :", updatedData);
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        updatedData, // Seul "userName" est accepté
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Réponse API :", response.data);
      return response.data.body; // Retourne les nouvelles données utilisateur
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update profile");
    }
  }
);
