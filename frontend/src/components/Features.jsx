import './Features.css'

function Features() {

  const features = [
    {
      icon: '🗣️',
      title: 'English Speaking',
      description: 'Build confidence and improve your everyday English speaking skills.'
    },
    {
      icon: '💬',
      title: 'Communication Skills',
      description: 'Learn how to communicate clearly and confidently in real situations.'
    },
    {
      icon: '🎤',
      title: 'Pronunciation',
      description: 'Improve your pronunciation and speak English more naturally.'
    },
    {
      icon: '💼',
      title: 'Interview Preparation',
      description: 'Practice common interview questions and develop professional communication.'
    },
    {
      icon: '📊',
      title: 'Presentation Skills',
      description: 'Learn how to prepare and deliver effective presentations with confidence.'
    },
    {
      icon: '🧠',
      title: 'Aptitude & Placement',
      description: 'Prepare for aptitude tests, placement exams and career opportunities.'
    }
  ]

  return (
    <section className="features">

      <div className="features-heading">

        <p className="section-tag">
          🚀 Everything You Need
        </p>

        <h2>
          Skills That Help You
          <span>Communicate & Succeed</span>
        </h2>

        <p className="section-description">
          Learn practical skills that help you perform better
          in college, interviews and your professional career.
        </p>

      </div>

      <div className="features-grid">

        {features.map((feature, index) => (
          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

            <button className="learn-more">
              Learn More →
            </button>

          </div>
        ))}

      </div>

    </section>
  )
}

export default Features