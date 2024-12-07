import axios from 'axios';

// Base URL of your backend API
const API_URL = 'http://localhost:5000/api/customers';  // Adjust based on your backend URL

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response;
  } catch (error) {
    throw error.response || error;
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response;
  } catch (error) {
    throw error.response || error;
  }
};
