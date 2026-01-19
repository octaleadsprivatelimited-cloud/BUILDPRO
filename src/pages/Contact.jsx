import { useState } from 'react'
import { supabase } from '../config/supabase'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project_type: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const { error: insertError } = await supabase
        .from('leads')
        .insert([formData])

      if (insertError) throw insertError

      setSuccess(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        project_type: '',
        message: '',
      })
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Failed to submit form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const projectTypes = [
    'Residential Construction',
    'Commercial Construction',
    'Renovation & Remodeling',
    'Interior Design',
    'Project Management',
    'Other',
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get Your <span className="text-gold-500">Free Quote</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <p className="font-semibold">Thank you for your inquiry!</p>
              <p>We've received your message and will contact you within 24 hours.</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="john@example.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="project_type" className="block text-gray-700 font-semibold mb-2">
                Project Type *
              </label>
              <select
                id="project_type"
                name="project_type"
                required
                value={formData.project_type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="">Select a project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-lg"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section-padding bg-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@buildpro.com</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-600">123 Construction Ave, City, State 12345</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

