import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken'); // Check if token exists

    if (!token) {
        return <Navigate to="/" />; // Redirect to login if no token
    }

    return children; // Render protected content if authenticated
};

export default ProtectedRoute;
