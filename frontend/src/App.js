import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/client/home';
import Register from './pages/auth';
import StockManagement from './pages/admin/stockManagement';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import Navbar from './components/navbar';

const App = () => {
  const location = useLocation(); // Obtén la ubicación actual
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user'); // Recupera usuario guardado
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Limpia el almacenamiento
  };

  return (
    <ThemeProvider>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Register setUser={setUser} />} />
        <Route path="/signup" element={<Register setUser={setUser} />} />
        <Route path="/stock" element={<StockManagement />} />
      </Routes>
    </ThemeProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;