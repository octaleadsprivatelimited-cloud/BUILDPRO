import { useEffect, useState } from 'react'
import { supabase } from '../config/supabase'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchProjects()
  }, [filter])

  const fetchProjects = async () => {
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('type', filter)
      }

      const { data, error } = await query

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'Residential', label: 'Residential' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Renovation', label: 'Renovation' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-gold-500">Projects</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing our portfolio of successful construction projects
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  setFilter(f.value)
                  setLoading(true)
                }}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  filter === f.value
                    ? 'bg-gold-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card animate-pulse overflow-hidden">
                  <div className="h-64 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="card overflow-hidden group">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-64 object-cover mb-4 rounded transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-300 rounded mb-4 flex items-center justify-center">
                      <span className="text-6xl">🏗️</span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-2">📍 {project.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gold-600 font-semibold">
                      {project.type}
                    </span>
                    {project.completion_year && (
                      <span className="text-sm text-gray-500">
                        {project.completion_year}
                      </span>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-700 mt-4 text-sm">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

