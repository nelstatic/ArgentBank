import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile, userEditAction } from "./userActions";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Mise à jour du profil utilisateur
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Erreur d'API
      })
      .addCase(userEditAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userEditAction.fulfilled, (state, action) => {
        console.log("Données reçues après succès :", action.payload);
        state.loading = false;
        state.userInfo = { ...state.userInfo, ...action.payload }; // Met à jour les infos
      })
      .addCase(userEditAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
