import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchCart, cartCheckout} from '../../services/api';
import CartCard from '../../components/CartCard';
import { generatePDF } from '../../components/PurchaseReceipt';


const Cart = () => {
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')); 
        if (user) {
          setUser(user); 
          const response = await fetchCart(user); 
          setCart(response.data); 
        }
      } catch (error) {
        console.error('Error obtaining the cart:', error);
      }
    };

    fetchCartData(); 
  }, []); 

  const handleCheckout = async () => {
    try {
      await cartCheckout(user); 

      console.log(cart)

      if (cart) {
        generatePDF(cart.products, cart);
      }
      
      setCart(null);
      alert('Purchase completed correctly');
    } catch (error) {
      console.error('Error closing the purchase', error);
    }
  };

  if (!cart) return (
    <div className="flex justify-center items-center h-full mt-32">
      <p className="text-5xl font-semibold text-gray-600">You don't have a cart yet :b</p>
    </div>
  );


  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Shopping Cart</h2>
      
      {cart.products.length === 0 ? (
        <p className="text-center text-xl text-gray-600">Your cart is empty</p>
      ) : (
        cart.products.map((product) => (
          <CartCard key={product.productId} product={product} />
        ))
      )}

      <div className="mt-8 flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-gray-800">Total: ${cart.totalAmount}</h3>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Make Purchase
        </button>
      </div>
    </div>
  );
};

export default Cart;
