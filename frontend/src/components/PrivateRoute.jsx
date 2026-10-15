import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    // Agar token hai, toh page (children) dikhao. 
    // Agar nahi hai, toh wapas '/login' par dhakka maar do.
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;