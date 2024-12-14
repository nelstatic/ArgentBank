import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./userActions"; // Importation de l'action asynchrone

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Mise à jour des informations utilisateur
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // En cas d'erreur
      });
  },
});

export default userSlice.reducer;
