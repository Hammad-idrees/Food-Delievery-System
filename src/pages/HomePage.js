// src/pages/HomePage.js
import React from 'react';
import '../styles/home.css'; // Import CSS file for styling
import Header from '../components/Header'; // Import Header Component

const HomePage = () => {
  return (
    <div className="home-container">
      {/* First Section with FoodRush on the left and Header on the right */}
      <div className="header-section">
        <div className="foodrush">
          <h1>FoodRush</h1>
        </div>
        <div className="header">
          <Header /> {/* The Header component */}
        </div>
      </div>

      {/* Section with text and image */}
      <div className="info-section">
        <div className="info-text">
          <h3 className="black-text">Local food, near you</h3>
          <h3 className="black-text">Your Favorite Food</h3>
          <h3 className="yellow-text">When You Want it</h3>
        </div>
        <div className="food-image">
          <img src="your-food-image.jpg" alt="Food" className="food-image-img" />
        </div>
      </div>

      {/* Display different foods for order */}
      <div className="food-order-section">
        <h2>Our Top Picks for You</h2>
        <div className="food-items">
          {/* Example food items */}
          <div className="food-item">
            <img src="food-item1.jpg" alt="Food 1" />
            <p>Pizza</p>
          </div>
          <div className="food-item">
            <img src="food-item2.jpg" alt="Food 2" />
            <p>Burger</p>
          </div>
          <div className="food-item">
            <img src="food-item3.jpg" alt="Food 3" />
            <p>Pasta</p>
          </div>
          {/* Add more food items as needed */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
