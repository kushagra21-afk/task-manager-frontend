import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchUnsplashImage } from '../utils/fetchImage';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://task-manager-xtbs.onrender.com/api/auth/register', formData);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      const image = await fetchUnsplashImage('beach');
      setImageUrl(image);
    };
    getImage();
  }, []);

  return (
    <div className='main' style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
          <button type="submit">Register</button>
        </form>
      </div>
      <div className='render'>
        <p><b>Please be patient, the backend takes time to boot!</b></p>
      </div>
    </div>
  );
};

export default Register;
