import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  
  // Local storage se check karo user logged in hai ya nahi
  const token = localStorage.getItem('token')

  const closeMenu = () => setMenuOpen(false)

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token') // Ticket delete kar do
    localStorage.removeItem('userId') // User ID bhi delete kar do
    closeMenu()
    navigate('/login') // Wapas login par bhej do
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>🎙️ Vocal Canvas</Link>
      </div>

      <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <div className="nav-links">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/" onClick={closeMenu}>Features</Link>
          {/* UPDATED: Learn link ab Verbal Ability Quiz par jayega */}
          <Link to="/verbal-ability" onClick={closeMenu}>Verbal Aptitude</Link>
          <Link to="/practice" onClick={closeMenu}>Practice</Link>
          
          {/* Dashboard link sirf tab dikhega jab token hoga */}
          {token && (
            <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
          )}
          
          <Link to="/" onClick={closeMenu}>About</Link>
        </div>

        <div className="nav-actions">
          {token ? (
            // Agar TOKEN HAI (User Logged In) -> Toh sirf Logout Button dikhao
            <button className="start-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            // Agar TOKEN NAHI HAI -> Toh Login / Get Started dikhao
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