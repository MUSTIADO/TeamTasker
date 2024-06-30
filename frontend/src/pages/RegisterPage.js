// RegisterPage.js

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { login } from '../services/auth'; // Import login function from auth.js

const RegisterPage = () => {
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

    const handleSubmit = async (e) => {
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
                login(formData); // Call login to store the token after successful registration
                setRegistrationMessage('User registered successfully!');
                setFormData({ username: '', email: '', password: '' });
            } else {
                setRegistrationMessage(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setRegistrationMessage('Registration failed. Please try again.');
        }
    };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
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

export default RegisterPage;
