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

export const getUserInfo = async (token) => {
  try {
    const response = await api.get('/user-info/', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    console.log(response.data); 
  } catch (error) {
    console.error('Error al obtener la información del usuario', error);
  }
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


// Añadir un producto
export const addToCart = async (product, user) => {
  return await api.post('/cart', {
    userId: user.userId,
    productId: product._id,
    name: product.name,
    image: product.image, //DEJO ESTO AQUI PARA QUE LO CAMBIEMOS POR LA IMAGEN CUANDO LAS TENGAMOS (SI LAS TENEMOS)
    quantity: 1,
    priceAtPurchase: product.price,
  });
};

// Traer los productos de un carrito.
export const fetchCart = async (user) => {
  return api.get(`/cart/${user.userId}`);
};

// Hacer el cambio de carrito y registrar la compra.
export const cartCheckout = async (user) => {
  return await api.post('/cart/checkout', {
    userId: user.userId, 
  });
};

// Obtener los recibos de un usuario
export const cartHistory = async (user) => {
  return await api.get(`/history/${user.userId}`); 
};
