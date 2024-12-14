import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../features/user/userActions"; // Action modifiée
import "../assets/css/main.css";
import { Navigate } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user); // Récupérer les infos utilisateur
  const { token, isLogged } = useSelector((state) => state.auth); // Vérification du token

  useEffect(() => {
    // console.log("Is Logged:", isLogged);
    // console.log("Token:", token);
    if (isLogged && token) {
      dispatch(fetchUserProfile(token)); // Appel de la fonction pour récupérer le profil
    }
  }, [dispatch, isLogged, token]);

  if (!isLogged) {
    return <Navigate to="/login" />; // Si non connecté, redirige vers /login
  }

  if (loading) return <div>Loading...</div>; // Affiche un chargement pendant la récupération des données
  if (error) return <div>{error}</div>; // Affiche une erreur s'il y en a une

  if (!userInfo) {
    return <div>No user info available</div>; // Si aucun userInfo, afficher ce message
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userInfo?.firstName} {userInfo?.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {userInfo?.accounts?.map((account, index) => (
        <section className="account" key={index}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">${account.balance}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
};

export default User;
