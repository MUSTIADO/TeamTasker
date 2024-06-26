import React, { useEffect, useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import { getProjects } from '../services/apiService';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      <ProjectForm />
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.name} - {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
