// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  const addToCart = async () => {
      try {
          const response = await axios.post('/api/cart', {
              userId: 'REAL_ID',
              productId: product._id,
              quantity: 1,
              priceAtPurchase: product.price, 
          });
          alert('Prodcut added to cart');
      } catch (error) {
          console.error('Error add', error);
      }
  };

  return (
    <div className="product-card">
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <button onClick={addToCart}>Add to cart</button>
    </div>
);
};

export default ProductCard;
