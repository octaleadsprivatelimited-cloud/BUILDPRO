import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../config/supabase'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch recent projects (limit to 6)
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6)

      // Fetch services
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true })

      setProjects(projectsData || [])
      setServices(servicesData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const highlights = [
    {
      title: 'Residential Construction',
      description: 'Custom homes built to perfection',
      icon: '🏠',
    },
    {
      title: 'Commercial Projects',
      description: 'Office buildings and retail spaces',
      icon: '🏢',
    },
    {
      title: 'Renovation & Remodeling',
      description: 'Transform your existing space',
      icon: '🔨',
    },
    {
      title: 'Project Management',
      description: 'End-to-end project oversight',
      icon: '📋',
    },
  ]

  const testimonials = [
    {
      name: 'John Smith',
      role: 'Homeowner',
      text: 'BuildPro delivered beyond our expectations. Professional, timely, and quality workmanship.',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      text: 'Our commercial project was completed on time and within budget. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Property Developer',
      text: 'The team at BuildPro is knowledgeable and reliable. They made our renovation seamless.',
      rating: 5,
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 text-center container-custom">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Building Trust.
            <br />
            <span className="text-gold-500">Delivering Excellence.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Your premier construction partner for residential and commercial projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Get Free Quote
            </Link>
            <a
              href="https://wa.me/1234567890?text=Hello!%20I%20would%20like%20to%20get%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              WhatsApp Contact
            </a>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            What We <span className="text-gold-600">Offer</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="card text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gray-100">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-gold-600">Us</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-gold-600 mb-2">15+</div>
              <h3 className="text-xl font-semibold mb-2">Years of Experience</h3>
              <p className="text-gray-600">
                Over a decade of delivering exceptional construction projects
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-gold-600 mb-2">500+</div>
              <h3 className="text-xl font-semibold mb-2">Projects Completed</h3>
              <p className="text-gray-600">
                Successfully delivered projects across residential and commercial sectors
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-gold-600 mb-2">1000+</div>
              <h3 className="text-xl font-semibold mb-2">Happy Clients</h3>
              <p className="text-gray-600">
                Building lasting relationships with satisfied customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">
              Recent <span className="text-gold-600">Projects</span>
            </h2>
            <Link to="/projects" className="text-gold-600 hover:text-gold-700 font-semibold">
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="card overflow-hidden">
                  {project.image_url && (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-48 object-cover mb-4 rounded"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-2">{project.location}</p>
                  <p className="text-sm text-gold-600">{project.type}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No projects available yet.</p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-100">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Client <span className="text-gold-600">Testimonials</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-gold-500 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

