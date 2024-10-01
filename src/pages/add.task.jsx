import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchUnsplashImage } from '../utils/fetchImage';

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'To Do',
    priority: 'Medium',
  });
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('https://task-manager-xtbs.onrender.com/api/post', taskData, { // Ensure endpoint is correct
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      navigate('/tasks');
    } catch (error) {
      console.error('Failed to add task:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      const image = await fetchUnsplashImage('tasks');
      setImageUrl(image);
    };
    getImage();
  }, []);

  return (
    <div className='main' style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="container">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={taskData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={taskData.description}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleChange}
            required
          />
          <select name="status" value={taskData.status} onChange={handleChange}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select name="priority" value={taskData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
