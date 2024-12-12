import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
// Pages
import Home from "./pages/Home.js";
import SignIn from "./pages/SignIn.js";
import User from "./pages/User.js";

// Composant pour les routes protégées
const ProtectedRoute = ({ children }) => {
  const { isLogged } = useSelector((state) => state.auth); // Utilise isLogged depuis le state Redux

  // Si l'utilisateur n'est pas connecté (isLogged === false), redirige vers la page de connexion
  if (!isLogged) {
    return <Navigate to="/login" />;
  }
  return children; // Retourne les enfants si l'utilisateur est connecté
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          {/* Route protégée pour l'utilisateur */}
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
