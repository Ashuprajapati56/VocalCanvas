
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom' 
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  
  const token = localStorage.getItem('token')

  const closeMenu = () => setMenuOpen(false)

  const handleLogout = () => {
    localStorage.removeItem('token') 
    localStorage.removeItem('userId') 
    localStorage.removeItem('userName') // Naam bhi clear kar diya logout par
    closeMenu()
    navigate('/login') 
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>🎙️ Vocal Canvas</Link>
      </div>

      <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <div className="nav-links">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active-link" : "nav-link"} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/verbal-ability" className={({isActive}) => isActive ? "nav-link active-link" : "nav-link"} onClick={closeMenu}>Verbal Aptitude</NavLink>
          <NavLink to="/practice" className={({isActive}) => isActive ? "nav-link active-link" : "nav-link"} onClick={closeMenu}>Practice</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active-link" : "nav-link"} onClick={closeMenu}>About</NavLink>
          
          {token && (
            <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active-link" : "nav-link"} onClick={closeMenu}>Dashboard</NavLink>
          )}
        </div>

        <div className="nav-actions">
          {token ? (
            <button className="start-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="login-btn" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" className="start-btn" onClick={closeMenu}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
    </nav>
  )
}

export default Navbar