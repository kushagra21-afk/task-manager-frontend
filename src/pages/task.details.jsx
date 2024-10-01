// src/pages/TaskDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import { fetchUnsplashImage } from '../utils/fetchImage'; // Import the Unsplash image fetching function
import "../styles.css";

const TaskDetails = () => {
  const { id } = useParams(); // Get task ID from URL parameters
  const [task, setTask] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // Fetch task based on ID
  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      try {
        const response = await axios.get(`https://task-manager-xtbs.onrender.com/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the JWT token
          },
        });
        setTask(response.data); // Set the task data
      } catch (error) {
        console.error('Error fetching task:', error.response ? error.response.data : error.message);
      }
    };

    fetchTask();
  }, [id]);

  // Fetch Unsplash image based on task title
  useEffect(() => {
    if (task && task.title) {
      const fetchUnsplashImageForTask = async () => {
        try {
          const image = await fetchUnsplashImage(task.title || 'task'); // Fetch image based on task title
          setImageUrl(image);
        } catch (error) {
          console.error('Failed to fetch Unsplash image:', error);
        }
      };

      fetchUnsplashImageForTask();
    }
  }, [task]);

  // Display loading message or task not found
  if (!task) return <p>Loading...</p>; // Show loading state until task is fetched

  return (
    <div className="container task-details">
      {imageUrl && <img src={imageUrl} alt="Task" className="unsplash-image" />}
      <h2>Task Details</h2>
      <div className="task-card">
        <h3>{task.title}</h3>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p> {/* Format date */}
        <p><strong>Priority:</strong> {task.priority}</p>
      </div>
    </div>
  );
};

export default TaskDetails;
