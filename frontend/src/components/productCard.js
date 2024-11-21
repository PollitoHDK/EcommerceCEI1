import React from 'react';
import axios from 'axios';
import { addToCart as addToCartService } from '../../src/services/api'; 

const ProductCard = ({ product, user}) => {
    const handleAddToCart = async () => {
        try {
            await addToCartService(product, user);
            alert('Product added to cart');
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    };

  return (
    <div className="group relative border border-gray-200 rounded-lg shadow-sm p-4">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
        {product.image ? (
          <img
            src={`data:${product.image.contentType};base64`}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-gray-300 flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-gray-700 font-bold">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        <p className="mt-1 text-sm font-medium text-gray-900">${product.price}</p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleAddToCart}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
