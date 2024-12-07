// src/components/Header.js
import React from 'react';
import '../styles/header.css'; // Import the styles

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <i className="fas fa-utensils logo-icon"></i> {/* Food icon */}
        <h1 className="app-name">FoodRush</h1>
      </div>
    </header>
  );
};

export default Header;
