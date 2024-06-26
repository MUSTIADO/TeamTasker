import React from 'react';
import './Home.css'; // Assuming you have a CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>
        This is the home page of your application. You can navigate to different sections using the navigation bar.
      </p>
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Register and manage users</li>
          <li>Create and manage projects</li>
          <li>Create and assign tasks</li>
          <li>Track task status and progress</li>
        </ul>
      </div>
      <div className="about">
        <h2>About Us</h2>
        <p>
          Our application aims to streamline project and task management for teams. With our easy-to-use interface, you can keep track of all your projects and tasks in one place.
        </p>
      </div>
    </div>
  );
};

export default Home;
