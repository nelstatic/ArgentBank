import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../features/user/userSlice"; // Action modifiée
import "../assets/css/main.css";
import { Navigate } from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user); // Récupérer les infos utilisateur
  const { token, isLogged } = useSelector((state) => state.auth); // Vérification du token

  useEffect(() => {
    if (isLogged && token) {
      dispatch(fetchUserProfile(token)); // Appel de la fonction pour récupérer le profil
    }
  }, [dispatch, isLogged, token]);

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
