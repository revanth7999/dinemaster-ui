import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css'; // Import the external CSS file

const Landing = () => {

  const handleApiCall = () => {
    useNavigate.push('/Initial');
  };

  return (
    <div className="landing-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to FoodHub</h1>
        <p className="hero-subtitle">
          Explore delicious cuisines and manage your food preferences
          seamlessly!
        </p>
        <img
          src="https://source.unsplash.com/600x400/?food"
          alt="Delicious Food"
          className="hero-image"
        />
        <button onClick={handleApiCall} className="btn-primary">
          Explore Menu
        </button>
      </div>

      <div className="features-section">
        <h2 className="features-title">Why Choose Us?</h2>
        <ul className="features-list">
          <li>🍽️ Wide variety of cuisines</li>
          <li>🍕 Real-time menu updates</li>
          <li>🍔 Easy to manage orders</li>
          <li>🥗 Personalized recommendations</li>
        </ul>
      </div>
    </div>
  );
};

export default Landing;
