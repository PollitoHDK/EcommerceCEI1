import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';


const App = () => {
  return (
    <Router>
      <Routes> {/* Cambiado de Switch a Routes */}
        <Route path="/" exact element={<Home />} /> {/* Cambiado de component a element */}
        <Route path="/register" exact element={<Register />} /> {/* Cambiado de component a element */}
        <Route path="/login" exact element={<Login />} /> {/* Cambiado de component a element */}
      </Routes>
    </Router>

  );
};

export default App;
