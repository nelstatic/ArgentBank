import axios from "axios";

// Fonction pour récupérer les informations du profil utilisateur
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête de la requête
        },
      }
    );
    return response; // Retourne les données récupérées
  } catch (error) {
    throw error; // Propager l'erreur en cas de problème
  }
};
