import React, { useState } from 'react';
import './Register.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setRegistrationMessage('Registration successful!');
        setFormData({ username: '', email: '', password: '' });
      } else {
        setRegistrationMessage(data.errors ? data.errors : 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setRegistrationMessage('Registration failed. Please try again.');
    }
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <h2>Register</h2>
      {registrationMessage && <p className="registration-message">{registrationMessage}</p>}
      <div className="form-group">
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={onChange} required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={onChange} required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={onChange}
            required
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
