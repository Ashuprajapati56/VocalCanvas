import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-logo">
                    <h3>🎙️ Vocal Canvas</h3>
                    <p>Master your communication. Ace your placements. Empowering students to speak confidently.</p>
                </div>
                
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <Link to="/">Home</Link>
                    <Link to="/practice">Practice Arena</Link>
                    <Link to="/verbal-ability">Aptitude Quiz</Link>
                    <Link to="/about">About Project</Link>
                </div>

                <div className="footer-social">
                    <h4>Connect</h4>
                    <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a href="#" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="mailto:contact@vocalcanvas.com">Contact Us</a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Vocal Canvas. Built with ❤️ by Ashu Prajapati & Aman Singh.</p>
            </div>
        </footer>
    );
};

export default Footer;