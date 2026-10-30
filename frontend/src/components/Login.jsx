import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Signup.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://vocalcanvas.onrender.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.user.id);
                localStorage.setItem('userName', data.user.name);
                toast.success("Login Successful! 🎉 Welcome back.");
                // Thoda delay taaki popup dikhe uske baad redirect ho
                setTimeout(() => {
                    window.location.href = '/practice';
                }, 1000);
            } else {
                toast.error("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error logging in", error);
            toast.error("Network Error: Could not reach backend.");
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