import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/themeStore'

function App() {
  const { darkMode } = useThemeStore()

  // Apply theme class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<div className="p-8">EZKv4 Platform</div>} />
          <Route path="/login" element={<div className="p-8">Login Page</div>} />
          <Route path="/register" element={<div className="p-8">Register Page</div>} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
