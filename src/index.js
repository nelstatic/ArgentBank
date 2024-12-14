import React from "react";
import ReactDOM from "react-dom/client"; // Importation de createRoot à la place de render
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import de PersistGate pour gérer la persistance
import { store, persistor } from "./redux/store"; // Importation des éléments nommés
import App from "./App";

// createRoot au lieu de render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
