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

// Obtener todos los productos
export const fetchProducts = async () => {
  return await api.get('/products');
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
  return await api.post('/products', productData);
};

// Actualizar un producto existente
export const patchProduct = async (productId, productData) => {
  return await api.put(`/products/${productId}`, productData);
};

// Eliminar un producto
export const deleteProduct = async (productId) => {
  return await api.delete(`/products/${productId}`);
};

export const getUserDetails = async (userId) => {
  return await api.get(`/users/${userId}`); 
};
