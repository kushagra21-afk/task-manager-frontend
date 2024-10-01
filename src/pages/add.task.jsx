// src/pages/AddTask.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'To Do', // Default status
    userId: '', // Changed from assignedUser to userId
    priority: 'Medium', // Default priority
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value }); // Update task data state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the token from localStorage

    try {
      await axios.post('https://task-manager-xtbs.onrender.com/api/tasks', taskData, { // Ensure endpoint is correct
        headers: {
          Authorization: `Bearer ${token}`, // Attach the JWT token
          'Content-Type': 'application/json',
        },
      });
      navigate('/tasks'); // Redirect to the task list after adding the task
    } catch (error) {
      console.error('Failed to add task:', error.response ? error.response.data : error.message);
    }
  };

  return (
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
        <input
          type="text"
          name="userId" // Changed input name from assignedUser to userId
          placeholder="User ID" // Update placeholder accordingly
          value={taskData.userId} // Bind to userId
          onChange={handleChange}
          required
        />
        <select name="priority" value={taskData.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
