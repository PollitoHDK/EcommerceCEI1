import { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/api/cart?userId=REAL_ID'); // Lo mismo que en el historial
        setCart(response.data);
      } catch (error) {
        console.error('Error obtaining the cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/api/cart/checkout', {
        userId: 'REAL_ID', // lo mismo que arriba
      });
      alert('Purchase completed correctly');
      setCart(null);
    } catch (error) {
      console.error('Error closing the purchase', error);
    }
  };

  if (!cart) return <p>loading cart...</p>;

  return (
    <div>
      <h2>Shopping Cart </h2>
      {cart.products.map((product) => (
        <div key={product.productId}>
          <p>Product: {product.productId}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price: ${product.priceAtPurchase}</p>
        </div>
      ))}
      <h3>Total: ${cart.totalAmount}</h3>
      <button onClick={handleCheckout}>Make purchase</button>
    </div>
  );
};

export default Cart;
