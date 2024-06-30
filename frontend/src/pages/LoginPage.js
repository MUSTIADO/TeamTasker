import React, { useState } from 'react';
import './Login.css'; // Assuming you want to style your form

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loginMessage, setLoginMessage] = useState('');

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Assuming your backend returns a token upon successful login
        localStorage.setItem('token', data.token); // Store token in localStorage or secure storage
        // Redirect or navigate to another page upon successful login
        window.location.href = '/dashboard'; // Redirect to dashboard or main app page
      } else {
        setLoginMessage(data.message || 'Login failed. Please check your credentials.'); // Display error message if login fails
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginMessage('Login failed. Please try again.'); // Handle unexpected errors
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {loginMessage && <p className="login-message">{loginMessage}</p>}
      <div className="form-group">
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={onChange} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" name="password" value={password} onChange={onChange} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
