import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/auth/loginAction";
import { clearError } from "../reducers/auth/authSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Réinitialise l'erreur lors du montage
  useEffect(() => {
    dispatch(clearError()); // Efface l'erreur existante
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError()); // Efface l'erreur avant de tenter une nouvelle connexion
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/user");
      })
      .catch((err) => {
        console.error("Login failed:", err);
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
