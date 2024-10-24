import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import CreateProduct from './components/CreateProduct';
import Products from './components/Products';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));  // Check if the user is logged in
  
  const handleLogin = (token) => {
    localStorage.setItem('token', token);  // Store the token in localStorage
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token from localStorage
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {isLoggedIn ? (
            <>
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/products" element={<Products />} />
              <Route path="*" element={<Navigate to="/products" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
