import { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/api/history/REAL_ID'); // No se como lo estan validando entonces aca va eso
        setHistory(response.data);
      } catch (error) {
        console.error('Error obtaining the user`s history:', error);
      }
    };

    fetchHistory();
  }, []);

  if (history.length === 0) {
    return <p>There are no purchases done by the user</p>;
  }

  return (
    <div>
      <h2>Purchase history</h2>
      {history.map((purchase) => (
        <div key={purchase._id}>
          <h3>Purchase done on: {new Date(purchase.purchaseDate).toLocaleString()}</h3>
          <p>Total: ${purchase.totalAmount}</p>
          <h4>Products:</h4>
          <ul>
            {purchase.products.map((product) => (
              <li key={product.productId}>
                Product: {product.productId}, Quantity: {product.quantity}, price: ${product.priceAtPurchase}
              </li>
            ))}
          </ul>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default History;
