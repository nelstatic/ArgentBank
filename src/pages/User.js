import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../reducers/user/userActions"; // Action modifiée
import "../assets/css/main.css";
import { Navigate } from "react-router-dom";
import EditForm from "../components/EditForm";

const User = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user); // Récupérer les infos utilisateur
  const { token, isLogged } = useSelector((state) => state.auth); // Vérification du token
  const [isEditing, setIsEditing] = useState(false); // État pour afficher/masquer le formulaire

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!userInfo) {
    return <div>No user info available</div>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userInfo?.firstName} {userInfo?.lastName}!
        </h1>
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit Name
        </button>
        {isEditing && <EditForm onClose={() => setIsEditing(false)} />}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section class="account">
        <div class="account-content-wrapper">
          <h3 class="account-title">Argent Bank Checking (x8349)</h3>
          <p class="account-amount">$2,082.79</p>
          <p class="account-amount-description">Available Balance</p>
        </div>
        <div class="account-content-wrapper cta">
          <button class="transaction-button">View transactions</button>
        </div>
      </section>
      <section class="account">
        <div class="account-content-wrapper">
          <h3 class="account-title">Argent Bank Savings (x6712)</h3>
          <p class="account-amount">$10,928.42</p>
          <p class="account-amount-description">Available Balance</p>
        </div>
        <div class="account-content-wrapper cta">
          <button class="transaction-button">View transactions</button>
        </div>
      </section>
      <section class="account">
        <div class="account-content-wrapper">
          <h3 class="account-title">Argent Bank Credit Card (x8349)</h3>
          <p class="account-amount">$184.30</p>
          <p class="account-amount-description">Current Balance</p>
        </div>
        <div class="account-content-wrapper cta">
          <button class="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default User;
