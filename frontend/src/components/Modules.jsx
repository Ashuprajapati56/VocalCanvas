import { Link } from 'react-router-dom';
import './Modules.css'

function Modules() {

  const modules = [
    {
      number: '01',
      icon: '📚',
      title: 'Learning Resources',
      description: 'Curated YouTube tutorials to help you master grammar, pronunciation, and aptitude.',
      button: 'Explore Resources',
      path: '/resources',
      isActive: true // ✅ NAYA: Ab yeh active ho gaya hai aur /resources par jayega
    },
    {
      number: '02',
      icon: '💬',
      title: 'Communication Skills',
      description: 'Develop confidence and learn how to communicate effectively in daily scenarios.',
      button: 'Explore Skills',
      path: '/practice',
      isActive: true 
    },
    {
      number: '03',
      icon: '🎤',
      title: 'Pronunciation & Fluency',
      description: 'Improve your pronunciation and speak English more naturally.',
      button: 'Coming Soon',
      path: '#',
      isActive: false // Yeh abhi bhi "Coming Soon" rahega
    },
    {
      number: '04',
      icon: '📊',
      title: 'Presentation Skills',
      description: 'Learn to prepare and deliver clear and confident presentations.',
      button: 'Learn More',
      path: '/practice',
      isActive: true 
    },
    {
      number: '05',
      icon: '💼',
      title: 'Interview & Career',
      description: 'Prepare for interviews, professional communication and placements.',
      button: 'Prepare Now',
      path: '/practice',
      isActive: true 
    },
    {
      number: '06',
      icon: '📝', 
      title: 'Verbal Aptitude Quiz', 
      description: 'Practice Placement and GATE English questions with detailed explanations.',
      button: 'Start Quiz',
      path: '/verbal-ability',
      isActive: true 
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

            {module.isActive ? (
              <Link to={module.path} className="module-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
                {module.button} →
              </Link>
            ) : (
              <span className="module-button" style={{ color: '#94a3b8', cursor: 'not-allowed' }}>
                ⏳ {module.button}
              </span>
            )}

          </div>

        ))}

      </div>

    </section>
  )
}

export default Modules