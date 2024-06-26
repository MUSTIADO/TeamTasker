import React, { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import { getUsers } from '../services/apiService';
import './Page.css';


const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="page-content">
      <h2>Users</h2>
      <UserForm />
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
