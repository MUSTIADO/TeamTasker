import React, { useEffect, useState } from 'react';
import TaskAssignmentForm from '../components/TaskAssignmentForm';
import { getTaskAssignments } from '../services/apiService';

const TaskAssignmentsPage = () => {
  const [taskAssignments, setTaskAssignments] = useState([]);

  useEffect(() => {
    fetchTaskAssignments();
  }, []);

  const fetchTaskAssignments = async () => {
    try {
      const response = await getTaskAssignments();
      setTaskAssignments(response);
    } catch (error) {
      console.error('Error fetching task assignments:', error);
    }
  };

  return (
    <div>
      <h2>Task Assignments</h2>
      <TaskAssignmentForm />
      <ul>
        {taskAssignments.map(assignment => (
          <li key={assignment.id}>
            Task ID: {assignment.task_id} - User ID: {assignment.user_id} - Role: {assignment.role} - Status: {assignment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskAssignmentsPage;
