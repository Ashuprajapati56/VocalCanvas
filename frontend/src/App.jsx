import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Modules from './components/Modules'
import VerbalPractice from './components/VerbalPractice'
import PrivateRoute from './components/PrivateRoute' 
import Dashboard from './components/Dashboard'
import VerbalAbility from './components/VerbalAbility'
import LearningResources from './components/LearningResources'
import About from './components/About'

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Modules />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verbal-ability" element={<VerbalAbility />} />
          <Route path="/resources" element={<LearningResources />} />
          
          {/* YAHAN FIX KIYA HAI 👇 */}
          <Route path="/about" element={<About />} />
          
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/practice" 
            element={
              <PrivateRoute>
                <VerbalPractice />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App