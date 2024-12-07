// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Import Header Component
import '../styles/register.css'; // Import the CSS file

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name, email, password, phone, address
      });

      // Save the token to localStorage or state if you need to keep the user logged in
      localStorage.setItem('authToken', response.data.token);

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Server error');
    }
  };

  return (
    <div className="register-container">
      {/* Header component */}
      <Header />

      <div className="background" id="radius-shape-1"></div>
      <div className="background" id="radius-shape-2"></div> 

      <div className="card">
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleRegister}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#2575fc' }}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
