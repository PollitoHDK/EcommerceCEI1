import React from 'react';

const HistoryCard = ({ purchase }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Purchase Date: {new Date(purchase.purchaseDate).toLocaleString()}
      </h3>
      <p className="text-gray-600 mt-2">
        <span className="font-medium">Total Amount:</span> ${purchase.totalAmount.toFixed(2)}
      </p>
      <h4 className="text-gray-700 font-semibold mt-4">Products:</h4>
      <ul className="mt-2 space-y-2">
        {purchase.products.map((product) => (
          <li
            key={product.productId}
            className="flex justify-between items-center border-b pb-2 text-gray-600"
          >
            <span>
              <strong>Product:</strong> {product.name}
            </span>
            <span>
              <strong>Quantity:</strong> {product.quantity}
            </span>
            <span>
              <strong>Price:</strong> ${product.priceAtPurchase.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryCard;
