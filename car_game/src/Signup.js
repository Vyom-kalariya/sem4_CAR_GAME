import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // New CSS file for Signup

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    game: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'User registered successfully!');
        setFormData({ username: '', password: '', game: '' });
        navigate('/home');
      } else {
        setMessage('Error: ' + (data.detail || JSON.stringify(data)));
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">RACING GAME SIGNUP</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              required
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              required
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <textarea
              name="game"
              placeholder="Game preferences (optional)"
              value={formData.game}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>
          <button type="submit" className="signup-button">
            START RACING
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;