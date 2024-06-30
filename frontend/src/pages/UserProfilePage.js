import React, { useEffect, useState } from 'react';

function UserProfilePage() {
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state

    useEffect(() => {
        // Fetch the user's profile data when the component mounts
        const fetchProfileData = async () => {
            setLoading(true); // Set loading state when fetching data
            try {
                const response = await fetch('http://localhost:5000/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setProfileData(data);
                    setLoading(false); // Reset loading state on successful fetch
                } else {
                    setMessage(data.error || 'Failed to fetch profile data');
                    setLoading(false); // Reset loading state on error
                }
            } catch (error) {
                setMessage('An error occurred: ' + error.message);
                setLoading(false); // Reset loading state on error
            }
        };

        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state when submitting form
        try {
            const response = await fetch('http://localhost:5000/api/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(profileData),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Profile updated successfully!');
            } else {
                setMessage(data.error || 'Failed to update profile');
            }
            setLoading(false); // Reset loading state after request completes
        } catch (error) {
            setMessage('An error occurred: ' + error.message);
            setLoading(false); // Reset loading state on error
        }
    };

    return (
        <div>
            <h1>User Profile</h1>
            {loading && <p>Loading...</p>} {/* Display loading indicator */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UserProfilePage;
