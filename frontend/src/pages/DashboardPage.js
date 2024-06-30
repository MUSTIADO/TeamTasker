import React, { useEffect, useState } from 'react';

function DashboardPage() {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch projects and tasks when the component mounts
        const fetchData = async () => {
            try {
                const [projectsResponse, tasksResponse] = await Promise.all([
                    fetch('http://localhost:5000/api/projects', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    }),
                    fetch('http://localhost:5000/api/tasks', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    }),
                ]);

                const projectsData = await projectsResponse.json();
                const tasksData = await tasksResponse.json();

                if (projectsResponse.ok && tasksResponse.ok) {
                    setProjects(projectsData);
                    setTasks(tasksData);
                } else {
                    setMessage('Failed to fetch data');
                }
            } catch (error) {
                setMessage('An error occurred: ' + error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {message && <p>{message}</p>}
            <div>
                <h2>Projects</h2>
                <ul>
                    {projects.map(project => (
                        <li key={project.id}>{project.name}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Tasks</h2>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>{task.title}</li>  /* Assuming tasks have a 'title' field */
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DashboardPage;
