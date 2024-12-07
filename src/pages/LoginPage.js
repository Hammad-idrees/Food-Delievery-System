// src/pages/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Import Header Component
import '../styles/login.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // React Router hook to navigate after successful login

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Save the token to localStorage for future requests
      localStorage.setItem('authToken', response.data.token);

      // Redirect user to the home page or profile after login
      navigate('/home'); // Change this to your desired path after successful login

    } catch (err) {
      // Handle errors (invalid credentials or server errors)
      setError(err.response ? err.response.data.message : 'Server error');
    }
  };

  return (
    <div className="login-container">
      {/* Header component */}
      <Header />

      <div className="background" id="radius-shape-1"></div>
      <div className="background" id="radius-shape-2"></div> 

      <div className="card">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account?{' '}
          <a href="/register" style={{ color: '#2575fc' }}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
