// components/AdminDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext'; // Ensure path is correct
import './Admin.css'; // Create this CSS file for styling
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { url } = useContext(StoreContext);
    const [token, setToken] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [managers, setManagers] = useState([]);
    const [formData, setFormData] = useState({ email: '', role: '', password: '' });
    const [adminLogin, setAdminLogin] = useState({ email: '', password: '' });
    const navigate = useNavigate(); // For navigation after successful login

    // Function to handle admin login
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${url}/api/admin/login`, adminLogin);
            setToken(response.data.token);
            setIsAuthenticated(true);
            localStorage.setItem('adminToken', response.data.token);
            //navigate to dashboard redirect
            navigate(response.data.redirectUrl || '/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Incorrect email or password');
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('adminToken');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchManagers = async () => {
                const response = await axios.get(`${url}/api/admin/managers`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setManagers(response.data);
            };
            fetchManagers();
        }
    }, [isAuthenticated, token]);

    // const handleCreateManager = async () => {
    //     await axios.post(`${url}/api/admin/manager`, formData, { headers: { Authorization: `Bearer ${token}` } });
    //     setFormData({ email: '', role: '', password: '' });
    // };

    const handleUpdateManager = async (id) => {
        await axios.put(`${url}/api/admin/manager/${id}`, { role: formData.role }, { headers: { Authorization: `Bearer ${token}` } });
    };

    const handleDeleteManager = async (id) => {
        await axios.delete(`${url}/api/admin/manager/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <h2>Admin Login</h2>
                <input
                    type="email"
                    placeholder="Admin Email"
                    value={adminLogin.email}
                    onChange={(e) => setAdminLogin({ ...adminLogin, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={adminLogin.password}
                    onChange={(e) => setAdminLogin({ ...adminLogin, password: e.target.value })}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            {/* <div className="manager-form">
                <input
                    type="email"
                    placeholder="Manager Email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Role (e.g., manager)"
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
                <button onClick={handleCreateManager}>Add Manager</button>
            </div> */}

            {/* <h3>Managers List</h3> */}
            <ul className="manager-list">
                {managers.map((manager) => (
                    <li key={manager._id}>
                        {manager.email} - {manager.role}
                        <button onClick={() => handleUpdateManager(manager._id)}>Update Role</button>
                        <button onClick={() => handleDeleteManager(manager._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
