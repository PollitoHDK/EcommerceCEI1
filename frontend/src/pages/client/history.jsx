import { useState, useEffect } from 'react';
import axios from 'axios';
import {cartHistory} from '../../services/api';
import HistoryCard from '../../components/HistoryCard';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')); 
        const response = await cartHistory(user)
        setHistory(response.data);
      } catch (error) {
        console.error('Error obtaining the user`s history:', error);
      }
    };

    fetchHistory();
  }, []);

  if (history.length === 0) {
    return (
      <div className="flex justify-center items-center h-full mt-32">
        <p className="text-5xl font-semibold text-gray-600">There are no purchases done by the user :b</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Purchase History</h2>
      {history.map((purchase) => (
        <HistoryCard key={purchase._id} purchase={purchase} />
      ))}
    </div>
  );
};

export default History;
