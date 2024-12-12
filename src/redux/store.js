import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; // Slice de l'authentification
import userReducer from "../features/user/userSlice"; // Slice des informations utilisateur

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
