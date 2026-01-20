import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const mainSections = [
    { path: '/', label: 'Home' },
    { path: '/section/us', label: 'U.S.' },
    { path: '/section/world', label: 'World' },
    { path: '/section/business', label: 'Business' },
    { path: '/section/arts', label: 'Arts' },
    { path: '/section/lifestyle', label: 'Lifestyle' },
    { path: '/section/opinion', label: 'Opinion' },
  ]

  return (
    <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-3xl font-bold text-black">
              The Times
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainSections.map((section) => (
              <Link
                key={section.path}
                to={section.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(section.path)
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                {section.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="ml-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-black"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            {mainSections.map((section) => (
              <Link
                key={section.path}
                to={section.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  isActive(section.path) ? 'text-black font-bold' : 'text-gray-700'
                }`}
              >
                {section.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700"
            >
              Admin
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
