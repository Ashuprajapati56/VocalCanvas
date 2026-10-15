import './Modules.css'

function Modules() {

  const modules = [
    {
      number: '01',
      icon: '📚',
      title: 'English Foundation',
      description: 'Build your vocabulary, grammar and basic English sentence skills.',
      button: 'Start Learning'
    },
    {
      number: '02',
      icon: '💬',
      title: 'Communication Skills',
      description: 'Develop confidence and learn how to communicate effectively.',
      button: 'Explore Skills'
    },
    {
      number: '03',
      icon: '🎤',
      title: 'Pronunciation & Fluency',
      description: 'Improve your pronunciation and speak English more naturally.',
      button: 'Start Practice'
    },
    {
      number: '04',
      icon: '📊',
      title: 'Presentation Skills',
      description: 'Learn to prepare and deliver clear and confident presentations.',
      button: 'Learn More'
    },
    {
      number: '05',
      icon: '💼',
      title: 'Interview & Career',
      description: 'Prepare for interviews, professional communication and placements.',
      button: 'Prepare Now'
    },
    {
      number: '06',
      icon: '🎙️',
      title: 'Verbal Practice',
      description: 'Practice speaking through real conversations and AI-powered verbal activities.',
      button: 'Start Speaking'
    }
  ]

  return (
    <section className="modules">

      <div className="modules-heading">

        <p className="modules-tag">
          🎯 Your Learning Journey
        </p>

        <h2>
          Learn. Practice.
          <span>Grow With Confidence.</span>
        </h2>

        <p>
          Follow our structured learning modules and develop
          the skills you need for college, interviews and your career.
        </p>

      </div>

      <div className="modules-grid">

        {modules.map((module) => (

          <div className="module-card" key={module.number}>

            <div className="module-top">
              <span className="module-number">
                {module.number}
              </span>

              <span className="module-icon">
                {module.icon}
              </span>
            </div>

            <h3>{module.title}</h3>

            <p>{module.description}</p>

            <button className="module-button">
              {module.button} →
            </button>

          </div>

        ))}

      </div>

    </section>
  )
}

export default Modules