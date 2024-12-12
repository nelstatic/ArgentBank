// loginApi.js
import axios from "axios";

export const loginApi = async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      credentials
    );
    return response; // Retourne la réponse de l'API
  } catch (error) {
    throw new Error("Authentication failed");
  }
};
