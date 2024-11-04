import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const registerUser = async (userData) => {
  return await api.post('/register', userData);
};

export const loginUser = async (credentials) => {
  return await api.post('/login', credentials);
};

export const fetchProducts = async () => {
  return await api.get('/products');
};

export const createProduct = async (productData) => {
  return await api.post('/products', productData);
};
