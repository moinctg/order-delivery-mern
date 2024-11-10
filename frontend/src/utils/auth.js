// utils/auth.js
export const isAuthenticated = () => {
    // Check if there's a token or any other authentication mechanism
    return !!localStorage.getItem('authToken'); // Example check
};