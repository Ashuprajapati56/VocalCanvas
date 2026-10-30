import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Signup.css'; 

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://vocalcanvas.onrender.com/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                toast.success("Registration Successful! 🎉 Please login.");
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                toast.error("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error signing up", error);
            toast.error("Network Error: Could not reach backend.");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="signup-container">
                <h2 className="signup-heading">Join Vocal Canvas</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <input 
                        type="text" name="name" placeholder="Full Name" 
                        onChange={handleChange} required 
                        className="signup-input"
                    />
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
                        Sign Up
                    </button>
                </form>
                
                <p className="auth-link">
                    Already have an account? <Link to="/login">Log in here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;