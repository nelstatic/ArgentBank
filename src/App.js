import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserProfile } from "./reducers/user/userActions";

import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import SignIn from "./pages/SignIn.js";
import User from "./pages/User.js";

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useSelector((state) => state.auth);
  if (!isLogged) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const dispatch = useDispatch();
  const { token, isLogged } = useSelector((state) => state.auth);

  // Recharger le profil utilisateur si un token est présent
  useEffect(() => {
    if (token && isLogged) {
      dispatch(fetchUserProfile(token)); // Récupération du profil utilisateur
    }
  }, [dispatch, token, isLogged]);

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
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
