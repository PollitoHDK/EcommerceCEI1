import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/productCard'; // Asegúrate de que la ruta sea correcta
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data); // Asumiendo que la respuesta es un array de productos
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Welcome to Our Store!</h1>
      <h2>Featured Products</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
        <div>
            <h1>Welcome to Our Store!</h1>
            <p>This is the home page.</p>
        </div>
    </div>

    

    
  );
};

export default Home;
