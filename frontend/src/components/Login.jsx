

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // 1. Token save kiya
                localStorage.setItem('token', data.token);
                alert("Login Successful! 🎉 Welcome back to Vocal Canvas.");
                
                // 2. User ko seedha Practice page par bhej diya (Yeh line add ki hai)
                window.location.href = '/practice';
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error logging in", error);
            alert("Network Error: Could not reach backend.");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="signup-container">
                <h2 className="signup-heading">Welcome Back</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input 
                        type="email" name="email" placeholder="Email Address" 
                        onChange={handleChange} required 
                        className="signup-input"
                    />
                    <input 
                        type="password" name="password" placeholder="Password" 
                        onChange={handleChange} required 
                        className="signup-input"
                    />
                    <button type="submit" className="signup-button">
                        Login
                    </button>
                </form>
                
                <p className="auth-link">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;