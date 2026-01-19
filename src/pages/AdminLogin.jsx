import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        // Sign up
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        })

        if (signUpError) throw signUpError

        if (data.user) {
          alert('Account created! Please check your email to verify your account.')
        }
      } else {
        // Sign in
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) throw signInError

        if (data.user) {
          navigate('/admin')
        }
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError(err.message || 'Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gold-600">BUILD</span>
              <span className="text-black">PRO</span>
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700">
              {isSignUp ? 'Create Admin Account' : 'Admin Login'}
            </h2>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="admin@buildpro.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
              }}
              className="text-gold-600 hover:text-gold-700 font-semibold"
            >
              {isSignUp
                ? 'Already have an account? Login'
                : "Don't have an account? Sign Up"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <a href="/" className="text-gray-600 hover:text-gold-600">
              ← Back to Website
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

