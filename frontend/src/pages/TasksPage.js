import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import { getTasks } from '../services/apiService';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <TaskForm />
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
