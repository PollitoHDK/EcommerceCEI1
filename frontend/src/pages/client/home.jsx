import React, { useEffect, useState } from 'react';
import { fetchProducts} from '../../services/api';
import ProductCard from '../../components/productCard'; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
        const response = await fetchProducts();
        setProducts(response.data); 
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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
