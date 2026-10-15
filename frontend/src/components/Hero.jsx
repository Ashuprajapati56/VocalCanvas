import './Hero.css'

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-tag">
          🎓 Built for College Students
        </p>

        <h1>
          Build Your Confidence.
          <span> Speak Without Fear.</span>
        </h1>

        <p className="hero-description">
          Improve your English, communication, pronunciation,
          interview and presentation skills — all in one place.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Start Learning
          </button>

          <button className="secondary-btn">
            Explore Modules
          </button>
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
  )
}

export default Hero