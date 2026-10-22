import React from 'react';
import './About.css';

import ashuPhoto from '../assets/ashuphoto.jpeg'; 
import amanPhoto from '../assets/amanphoto.jpeg';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                
                <p className="about-tag">👋 Know The Creators</p>
                
                <h2 className="about-title">
                    About <span>Vocal Canvas</span>
                </h2>
                
                <p className="about-description">
                    Vocal Canvas is an AI-powered web platform designed to help college students improve their English speaking, communication, and placement interview skills. Through real-time speech-to-text analysis and Gemini AI feedback, we aim to build confidence through short, repeatable practice sessions.
                </p>

                <div className="team-section">
                    <div className="team-header">
                        <h3 className="team-name">Team Vocal Nodes</h3>
                        <p className="college-name">🎓 Madhav Institute of Technology and Science (MITS), Gwalior</p>
                    </div>

                    <div className="team-grid">
                        {/* Member 1: Ashu */}
                        <div className="member-card">
                            <img src={ashuPhoto} alt="Ashu Prajapati" className="member-image" />
                            <h4 className="member-name">Ashu Prajapati</h4>
                            <span className="member-role">Lead Full Stack Developer</span>
                            
                            <p className="member-contribution">
                                Developed the core MERN backend, implemented Google Gemini AI integration, speech-to-text functionality, and built the overall application architecture.
                            </p>
                            
                            <div className="social-links">
                                <a href="https://github.com/Ashuprajapati56" target="_blank" rel="noopener noreferrer" className="social-btn btn-github">
                                    GitHub
                                </a>
                                <a href="https://www.linkedin.com/in/ashu-prajapati-508532300" target="_blank" rel="noopener noreferrer" className="social-btn btn-linkedin">
                                    LinkedIn
                                </a>
                                <a href="https://www.instagram.com/ashu_prajapati0071?vrfl=MWk5dzY4OTZya2w1ZQ==" target="_blank" rel="noopener noreferrer" className="social-btn btn-instagram">
                                    Instagram
                                </a>
                            </div>
                        </div>

                        {/* Member 2: Aman */}
                        <div className="member-card">
                            <img src={amanPhoto} alt="Aman Singh" className="member-image" />
                            <h4 className="member-name">Aman Singh</h4>
                            <span className="member-role">Frontend & UI/UX Developer</span>
                            
                            <p className="member-contribution">
                                Designed the user interface, created responsive React components (Dashboard, Modules), and ensured a seamless, user-friendly experience across all devices.
                            </p>

                            <div className="social-links">
                                <a href="https://github.com/amansingh1107" target="_blank" rel="noopener noreferrer" className="social-btn btn-github">
                                    GitHub
                                </a>
                                <a href="https://www.linkedin.com/in/ashu-prajapati-508532300" target="_blank" rel="noopener noreferrer" className="social-btn btn-linkedin">
                                    LinkedIn
                                </a>
                                <a href="https://www.instagram.com/aman.sikarwar06?mdxt=ZGN1b2NqOHh1eDVx" target="_blank" rel="noopener noreferrer" className="social-btn btn-instagram">
                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;