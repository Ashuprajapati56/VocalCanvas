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
    localStorage.removeItem('token') 
    localStorage.removeItem('userId') 
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
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/" onClick={closeMenu}>Features</Link>
          <Link to="/verbal-ability" onClick={closeMenu}>Verbal Aptitude</Link>
          <Link to="/practice" onClick={closeMenu}>Practice</Link>
          
          {token && (
            <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
          )}
          
          {/* YAHAN FIX KIYA HAI 👇 */}
          <Link to="/about" onClick={closeMenu}>About</Link>
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