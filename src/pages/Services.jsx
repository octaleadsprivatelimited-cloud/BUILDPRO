import { useEffect, useState } from 'react'
import { supabase } from '../config/supabase'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const defaultServices = [
    {
      title: 'Residential Construction',
      description: 'We build custom homes tailored to your vision. From initial design to final walkthrough, we ensure every detail meets your expectations.',
      icon: '🏠',
    },
    {
      title: 'Commercial Construction',
      description: 'Expert commercial construction services for offices, retail spaces, and industrial facilities. Delivered on time and within budget.',
      icon: '🏢',
    },
    {
      title: 'Interior & Renovation',
      description: 'Transform your existing space with our renovation services. We handle everything from design to execution with precision.',
      icon: '🔨',
    },
    {
      title: 'Turnkey Projects',
      description: 'Complete project management from concept to completion. We handle all aspects so you don\'t have to.',
      icon: '📋',
    },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-gold-500">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive construction solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-12 w-12 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayServices.map((service, index) => (
                <div key={service.id || index} className="card">
                  <div className="text-5xl mb-4">{service.icon || '🏗️'}</div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-100">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your <span className="text-gold-600">Project?</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Get a free quote today and let's bring your construction vision to life.
          </p>
          <a href="/contact" className="btn-primary text-lg">
            Get Free Quote
          </a>
        </div>
      </section>
    </div>
  )
}

