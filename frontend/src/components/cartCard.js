import React from 'react';

const CartCard = ({ product }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-6">
      {/* Contenedor para la información del producto (izquierda) */}
      <div className="flex-1 pr-6">
        <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
        <p className="text-lg text-gray-500">Quantity: {product.quantity}</p>
        <p className="text-lg font-medium text-gray-900">
          Price: ${product.priceAtPurchase}
        </p>
      </div>

      {/* Contenedor para la imagen del producto (derecha) */}
      <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
        {product.image ? (
          <img
            src={`http://localhost:3001${product.image}`} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>No Image Available</span>
        )}
      </div>
    </div>
  );
};

export default CartCard;
