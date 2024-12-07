// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<RegisterPage />} /> Show Register page by default
        
        {/* Register page */}
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Home page, only accessible after login */}
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
