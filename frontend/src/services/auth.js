// auth.js

export const storeToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const login = async (credentials) => {
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (response.ok) {
            storeToken(data.access_token);
            return { success: true };
        } else {
            return { success: false, error: data.message || 'Login failed' };
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    // Perform any additional cleanup or logout actions
};
