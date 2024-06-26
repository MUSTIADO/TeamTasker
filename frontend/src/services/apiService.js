// apiService.js

const BASE_URL = 'http://localhost:5000/api'; // Replace with your backend API base URL

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  return handleResponse(response);
};

export const createUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};

export const getProjects = async () => {
  const response = await fetch(`${BASE_URL}/projects`);
  return handleResponse(response);
};

export const createProject = async (projectData) => {
  const response = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  return handleResponse(response);
};

export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`);
  return handleResponse(response);
};

export const createTask = async (taskData) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
};

export const getTaskAssignments = async () => {
  const response = await fetch(`${BASE_URL}/task_assignments`);
  return handleResponse(response);
};

export const createTaskAssignment = async (assignmentData) => {
  const response = await fetch(`${BASE_URL}/task_assignments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assignmentData),
  });
  return handleResponse(response);
};
