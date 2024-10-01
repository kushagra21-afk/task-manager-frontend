import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchUnsplashImage } from '../utils/fetchImage';
import "../styles.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('https://task-manager-xtbs.onrender.com/api/post', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error.response ? error.response.data : error.message);
      }
    };

    const getImage = async () => {
      try {
        const image = await fetchUnsplashImage('tasks');
        setImageUrl(image);
      } catch (error) {
        console.error('Failed to fetch Unsplash image:', error);
      }
    };

    fetchTasks();
    getImage();
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textShadow: '1px 1px 5px rgba(0, 0, 0, 0.7)',
  };

  const handleAddTask = () => {
    navigate('/tasks/add');
  };

  return (
    <div style={backgroundStyle}>
      <div className='container'>
        <h2>My Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks found. Please add some tasks!</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <Link to={`/tasks/${task._id}`} style={{ color: 'black', textDecoration: 'underline' }}>
                  {task.title} - {task.status} - {task.priority}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleAddTask} className="add-task-button">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskList;
