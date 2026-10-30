import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["Speak Without Fear.", "Ace Your Placements.", "Master Your English."];

  useEffect(() => {
    let timer = setTimeout(() => handleType(), typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  const handleType = () => {
    const i = loopNum % words.length;
    const fullText = words[i];

    setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

    setTypingSpeed(isDeleting ? 50 : 100);

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 1500); // Word type hone ke baad thoda rukega
      setTypingSpeed(150);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(500); // Naya word shuru hone se pehle ka break
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-tag">
          🎓 Built for College Students
        </p>

        <h1>
          Build Your Confidence.
          <br />
          <span className="typing-text">{text}</span>
          <span className="cursor">|</span>
        </h1>

        <p className="hero-description">
          Improve your English, communication, pronunciation,
          interview and presentation skills — all in one place.
        </p>

        <div className="hero-buttons">
          <Link to="/signup" className="primary-btn" style={{ textDecoration: 'none' }}>
            Start Learning
          </Link>

          <Link to="/verbal-ability" className="secondary-btn" style={{ textDecoration: 'none' }}>
            Explore Modules
          </Link>
        </div>
      </div>

      <div className="hero-visual">
        <div className="voice-card">
          <div className="mic-icon">🎙️</div>

          <h3>Speak. Practice. Improve.</h3>

          <div className="sound-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <p>AI-powered speaking practice</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;