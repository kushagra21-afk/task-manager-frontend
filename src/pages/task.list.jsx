// src/pages/TaskList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import { fetchUnsplashImage } from '../utils/fetchImage'; // Import the Unsplash image fetching function
import "../styles.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // State to hold tasks
  const [imageUrl, setImageUrl] = useState(''); // State to hold Unsplash image URL

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage

      try {
        const response = await axios.get('https://task-manager-xtbs.onrender.com/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the JWT token
          },
        });
        setTasks(response.data); // Set the tasks data from API response
      } catch (error) {
        console.error('Failed to fetch tasks:', error.response ? error.response.data : error.message);
      }
    };

    const getImage = async () => {
      try {
        const image = await fetchUnsplashImage('tasks'); // Fetch image for tasks
        setImageUrl(image); // Set the fetched image URL
      } catch (error) {
        console.error('Failed to fetch Unsplash image:', error);
      }
    };

    fetchTasks(); // Call the function to fetch tasks
    getImage();   // Call the function to get the image
  }, []);

  // Background style for the task list
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh', // Full height of the viewport
    width: '100vw',  // Full width of the viewport
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)', // Add text shadow for readability
  };

  return (
    <div style={backgroundStyle}>
      <div className='container'>
        <h2>My Tasks</h2>
        {tasks.length === 0 ? ( // Check if there are no tasks
          <p>No tasks found. Please add some tasks!</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <Link to={`/tasks/${task._id}`} style={{ color: 'white', textDecoration: 'underline' }}>
                  {task.title} - {task.status} - {task.priority} {/* Display task title, status, and priority */}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
