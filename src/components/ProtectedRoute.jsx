import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../config/supabase'

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setAuthenticated(!!session)
    } catch (error) {
      console.error('Auth check error:', error)
      setAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-600"></div>
      </div>
    )
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

