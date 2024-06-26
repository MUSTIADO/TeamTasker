import React, { useState } from 'react';
import './Login.css'; // Import your Login-specific CSS file
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons for password visibility toggle

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
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
        console.log(data.message);
        // Handle successful login, e.g., redirect to dashboard
      } else {
        console.error(data.message);
        // Handle login error, e.g., display error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    }
  };

  return (
    <form className="form-container" onSubmit={onSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={onChange} required />
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
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
