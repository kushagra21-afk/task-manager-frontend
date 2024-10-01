import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchUnsplashImage } from '../utils/fetchImage';
import "../styles.css";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`https://task-manager-xtbs.onrender.com/api/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error.response ? error.response.data : error.message);
      }
    };

    fetchTask();
  }, [id]);

  useEffect(() => {
    if (task && task.title) {
      const fetchUnsplashImageForTask = async () => {
        try {
          const image = await fetchUnsplashImage(task.title || 'task');
          setImageUrl(image);
        } catch (error) {
          console.error('Failed to fetch Unsplash image:', error);
        }
      };

      fetchUnsplashImageForTask();
    }
  }, [task]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="container task-details">
      {imageUrl && <img src={imageUrl} alt="Task" className="unsplash-image" />}
      <h2>Task Details</h2>
      <div className="task-card">
        <h3>{task.title}</h3>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
      </div>
    </div>
  );
};

export default TaskDetails;
