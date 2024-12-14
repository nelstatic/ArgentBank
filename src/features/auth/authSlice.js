import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./loginAction";

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
        state.isLogged = true;
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
