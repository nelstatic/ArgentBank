import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Utiliser localStorage pour la persistance
import authSlice from "../reducers/auth/authSlice"; // Chemin mis à jour
import userSlice from "../reducers/user/userSlice"; // Chemin mis à jour
import { persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

// Création du persistant reducer pour le slice auth
const persistedAuthSlice = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthSlice, // Utilisation du persistedAuthSlice
    user: userSlice, // Pas besoin de persistance ici
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
