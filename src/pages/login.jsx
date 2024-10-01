// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://task-manager-xtbs.onrender.com/api/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
      });
      
      const { token, user } = response.data; // Destructure token and user from the response

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Optional: Store user information in localStorage (if needed)
      localStorage.setItem('user', JSON.stringify(user));
      console.log(token,user)
      // Redirect to tasks after successful login
      navigate('/tasks');
    } catch (error) {
      if (error.response) {
        console.error('Login error:', error.response.data); // Log error response data
      } else {
        console.error('Error:', error.message); // Log any other errors
      }
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
