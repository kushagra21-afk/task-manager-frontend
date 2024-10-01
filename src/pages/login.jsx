import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchUnsplashImage } from '../utils/fetchImage';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [imageUrl, setImageUrl] = useState('');
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
          'Content-Type': 'application/json',
        },
      });
      
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/tasks');
    } catch (error) {
      if (error.response) {
        console.error('Login error:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    const getImage = async () => {
      const image = await fetchUnsplashImage('beach');
      setImageUrl(image);
    };
    getImage();
  }, []);

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className='main' style={{ backgroundImage: `url(${imageUrl})` }}>
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
        <p>Don't have an account?</p>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
      <div className='render'>
        <p><b>Please be patient, the backend takes time to boot!</b></p>
      </div>
    </div>
  );
};

export default Login;
