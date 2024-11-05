import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/client/home';
import Register from './pages/auth';
import StockManagement from './pages/admin/stockManagement';
import './index.css';
import { ThemeProvider } from '@material-tailwind/react';
import Navbar from './components/navbar';

const App = () => {
  const location = useLocation();

  return (
    <ThemeProvider>
      {/* Renderiza la Navbar solo si la ruta actual no es /auth */}
      {location.pathname !== '/auth' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Register />} />
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
