import axios from "axios";

// Base URL de l' API
const API_URL = "http://localhost:3001/api/v1";

// Fonction pour gérer les requêtes GET
export const getRequest = async (endpoint, token = null) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await axios.get(`${API_URL}${endpoint}`, config);
  return response.data;
};

// Fonction pour gérer les requêtes POST
export const postRequest = async (endpoint, data, token = null) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await axios.post(`${API_URL}${endpoint}`, data, config);
  return response.data;
};

// Fonction pour gérer les requêtes PUT
export const putRequest = async (endpoint, data, token = null) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await axios.put(`${API_URL}${endpoint}`, data, config);
  return response.data;
};
