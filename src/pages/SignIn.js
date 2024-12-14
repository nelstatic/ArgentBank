import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/loginAction"; // Mise à jour du chemin d'importation de l'action de connexion
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth); // Utilisation de auth pour l'état de l'authentification
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch de l'action loginUser avec les données du formulaire
    dispatch(loginUser({ email, password }))
      .then(() => {
        navigate("/user"); // Redirige l'utilisateur vers le profil après connexion
      })
      .catch((error) => {
        console.log("Login failed:", error);
      });
  };

  return (
    <div>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Gestion du champ email
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Gestion du champ password
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </button>
            {error && (
              <div className="error-message">
                {typeof error === "object" ? error.message : error}
              </div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};

export default SignIn;
