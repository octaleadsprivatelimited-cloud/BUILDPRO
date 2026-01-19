import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({
    leads: 0,
    projects: 0,
    services: 0,
    newLeads: 0,
    recentLeads: [],
  })
  const [leads, setLeads] = useState([])
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [notification, setNotification] = useState({ type: '', message: '' })
  const navigate = useNavigate()

  // Form states
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [editingService, setEditingService] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [projectForm, setProjectForm] = useState({
    title: '',
    location: '',
    type: '',
    description: '',
    completion_year: '',
    image_url: '',
  })

  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    icon: '',
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (activeTab !== 'dashboard') {
      fetchData()
    }
  }, [activeTab])

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification({ type: '', message: '' }), 3000)
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      // Fetch stats
      const [leadsRes, projectsRes, servicesRes, recentLeadsRes] = await Promise.all([
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase
          .from('leads')
          .select('*')
          .eq('status', 'new')
          .order('created_at', { ascending: false })
          .limit(5),
      ])

      const newLeadsCount = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new')

      setStats({
        leads: leadsRes.count || 0,
        projects: projectsRes.count || 0,
        services: servicesRes.count || 0,
        newLeads: newLeadsCount.count || 0,
        recentLeads: recentLeadsRes.data || [],
      })

      // Fetch full data based on active tab
      if (activeTab === 'leads') {
        let query = supabase.from('leads').select('*').order('created_at', { ascending: false })

        if (statusFilter !== 'all') {
          query = query.eq('status', statusFilter)
        }

        const { data } = await query
        let filteredData = data || []

        if (searchTerm) {
          filteredData = filteredData.filter(
            (lead) =>
              lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              lead.phone.includes(searchTerm) ||
              lead.project_type.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }

        setLeads(filteredData)
      } else if (activeTab === 'projects') {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
        setProjects(data || [])
      } else if (activeTab === 'services') {
        const { data } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: true })
        setServices(data || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      showNotification('error', 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'leads') {
      fetchData()
    }
  }, [searchTerm, statusFilter])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const handleLeadStatusUpdate = async (leadId, newStatus) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId)

      if (error) throw error
      showNotification('success', 'Lead status updated successfully')
      fetchData()
    } catch (error) {
      console.error('Error updating lead:', error)
      showNotification('error', 'Failed to update lead status')
    }
  }

  const handleDeleteLead = async (leadId) => {
    if (!confirm('Are you sure you want to delete this lead?')) return

    try {
      const { error } = await supabase.from('leads').delete().eq('id', leadId)
      if (error) throw error
      showNotification('success', 'Lead deleted successfully')
      fetchData()
    } catch (error) {
      console.error('Error deleting lead:', error)
      showNotification('error', 'Failed to delete lead')
    }
  }

  const handleImageUpload = async (event) => {
    try {
      setUploadingImage(true)
      const file = event.target.files[0]
      if (!file) return

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `project-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('project-images').getPublicUrl(filePath)

      setProjectForm({ ...projectForm, image_url: publicUrl })
      showNotification('success', 'Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image:', error)
      showNotification('error', 'Failed to upload image. You can paste URL manually.')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!projectForm.title || !projectForm.location || !projectForm.type) {
      showNotification('error', 'Please fill in all required fields (Title, Location, Type)')
      return
    }

    try {
      // Prepare data - convert empty strings to null for optional fields
      const projectData = {
        title: projectForm.title.trim(),
        location: projectForm.location.trim(),
        type: projectForm.type,
        description: projectForm.description?.trim() || null,
        completion_year: projectForm.completion_year 
          ? parseInt(projectForm.completion_year) 
          : null,
        image_url: projectForm.image_url?.trim() || null,
      }

      if (editingProject) {
        const { data, error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id)
          .select()

        if (error) {
          console.error('Update error:', error)
          showNotification('error', `Failed to update project: ${error.message || error.details || 'Unknown error'}`)
          return
        }
        showNotification('success', 'Project updated successfully')
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert([projectData])
          .select()

        if (error) {
          console.error('Insert error:', error)
          showNotification('error', `Failed to create project: ${error.message || error.details || 'Unknown error'}`)
          return
        }
        showNotification('success', 'Project created successfully')
      }

      setShowProjectForm(false)
      setEditingProject(null)
      setProjectForm({
        title: '',
        location: '',
        type: '',
        description: '',
        completion_year: '',
        image_url: '',
      })
      fetchData()
    } catch (error) {
      console.error('Error saving project:', error)
      const errorMessage = error?.message || error?.details || 'Unknown error occurred'
      showNotification('error', `Failed to save project: ${errorMessage}`)
    }
  }

  const handleServiceSubmit = async (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!serviceForm.title || !serviceForm.description) {
      showNotification('error', 'Please fill in all required fields (Title, Description)')
      return
    }

    try {
      // Prepare data - convert empty strings to null for optional fields
      const serviceData = {
        title: serviceForm.title.trim(),
        description: serviceForm.description.trim(),
        icon: serviceForm.icon?.trim() || null,
      }

      if (editingService) {
        const { data, error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', editingService.id)
          .select()

        if (error) {
          console.error('Update error:', error)
          showNotification('error', `Failed to update service: ${error.message || error.details || 'Unknown error'}`)
          return
        }
        showNotification('success', 'Service updated successfully')
      } else {
        const { data, error } = await supabase
          .from('services')
          .insert([serviceData])
          .select()

        if (error) {
          console.error('Insert error:', error)
          showNotification('error', `Failed to create service: ${error.message || error.details || 'Unknown error'}`)
          return
        }
        showNotification('success', 'Service created successfully')
      }

      setShowServiceForm(false)
      setEditingService(null)
      setServiceForm({
        title: '',
        description: '',
        icon: '',
      })
      fetchData()
    } catch (error) {
      console.error('Error saving service:', error)
      const errorMessage = error?.message || error?.details || 'Unknown error occurred'
      showNotification('error', `Failed to save service: ${errorMessage}`)
    }
  }

  const handleDelete = async (table, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (error) throw error
      showNotification('success', 'Item deleted successfully')
      fetchData()
    } catch (error) {
      console.error('Error deleting:', error)
      showNotification('error', 'Failed to delete item')
    }
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setProjectForm({
      title: project.title,
      location: project.location,
      type: project.type,
      description: project.description || '',
      completion_year: project.completion_year || '',
      image_url: project.image_url || '',
    })
    setShowProjectForm(true)
  }

  const handleEditService = (service) => {
    setEditingService(service)
    setServiceForm({
      title: service.title,
      description: service.description,
      icon: service.icon || '',
    })
    setShowServiceForm(true)
  }

  if (loading && activeTab === 'dashboard') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Notification */}
      {notification.message && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="bg-black text-white shadow-lg sticky top-0 z-40">
        <div className="container-custom py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <span className="text-gold-500">BUILD</span>
              <span>PRO</span> Admin Panel
            </h1>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold-500 transition-colors"
              >
                View Website
              </a>
              <button
                onClick={handleLogout}
                className="bg-gold-600 hover:bg-gold-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-md sticky top-16 z-30">
        <div className="container-custom">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'leads', label: 'Leads', icon: '📧', badge: stats.newLeads },
              { id: 'projects', label: 'Projects', icon: '🏗️' },
              { id: 'services', label: 'Services', icon: '⚙️' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setSearchTerm('')
                  setStatusFilter('all')
                }}
                className={`px-6 py-4 font-semibold capitalize transition-colors whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? 'text-gold-600 border-b-2 border-gold-600'
                    : 'text-gray-600 hover:text-gold-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {tab.badge > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-gold-500 to-gold-600 text-white">
                <div className="text-4xl font-bold mb-2">{stats.leads}</div>
                <div className="text-xl mb-1">Total Leads</div>
                <div className="text-sm opacity-90">
                  {stats.newLeads} new
                </div>
              </div>
              <div className="card bg-gradient-to-br from-gray-800 to-black text-white">
                <div className="text-4xl font-bold mb-2">{stats.projects}</div>
                <div className="text-xl">Total Projects</div>
              </div>
              <div className="card bg-gradient-to-br from-gold-500 to-gold-600 text-white">
                <div className="text-4xl font-bold mb-2">{stats.services}</div>
                <div className="text-xl">Total Services</div>
              </div>
              <div className="card bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <div className="text-4xl font-bold mb-2">{stats.newLeads}</div>
                <div className="text-xl">New Leads</div>
                <div className="text-sm opacity-90">Requires attention</div>
              </div>
            </div>

            {/* Recent Leads */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-6">Recent New Leads</h3>
              {stats.recentLeads.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Phone</th>
                        <th className="text-left p-3">Project Type</th>
                        <th className="text-left p-3">Date</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentLeads.map((lead) => (
                        <tr key={lead.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{lead.name}</td>
                          <td className="p-3">{lead.email}</td>
                          <td className="p-3">{lead.phone}</td>
                          <td className="p-3">{lead.project_type}</td>
                          <td className="p-3 text-sm text-gray-600">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => {
                                setActiveTab('leads')
                                fetchData()
                              }}
                              className="text-gold-600 hover:text-gold-700 text-sm font-semibold"
                            >
                              View All →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No new leads</p>
              )}
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-3xl font-bold">Leads Management</h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="converted">Converted</option>
                </select>
              </div>
            </div>

            <div className="card overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Phone</th>
                    <th className="text-left p-4">Project Type</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length > 0 ? (
                    leads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-semibold">{lead.name}</td>
                        <td className="p-4">{lead.email}</td>
                        <td className="p-4">{lead.phone}</td>
                        <td className="p-4">{lead.project_type}</td>
                        <td className="p-4">
                          <select
                            value={lead.status || 'new'}
                            onChange={(e) => handleLeadStatusUpdate(lead.id, e.target.value)}
                            className={`px-3 py-1 border rounded text-sm ${
                              lead.status === 'new'
                                ? 'bg-yellow-100 text-yellow-800'
                                : lead.status === 'converted'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="quoted">Quoted</option>
                            <option value="converted">Converted</option>
                          </select>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {lead.message && (
                              <details className="text-sm">
                                <summary className="cursor-pointer text-gold-600 hover:text-gold-700">
                                  View
                                </summary>
                                <p className="mt-2 text-gray-700 p-2 bg-gray-50 rounded">
                                  {lead.message}
                                </p>
                              </details>
                            )}
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-gray-600">
                        No leads found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Projects Management</h2>
              <button
                onClick={() => {
                  setEditingProject(null)
                  setProjectForm({
                    title: '',
                    location: '',
                    type: '',
                    description: '',
                    completion_year: '',
                    image_url: '',
                  })
                  setShowProjectForm(true)
                }}
                className="btn-primary"
              >
                + Add Project
              </button>
            </div>

            {showProjectForm && (
              <div className="card mb-6">
                <h3 className="text-xl font-bold mb-4">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">Title *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, title: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Location *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.location}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, location: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Type *</label>
                      <select
                        required
                        value={projectForm.type}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, type: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-500"
                      >
                        <option value="">Select type</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Renovation">Renovation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Completion Year</label>
                      <input
                        type="number"
                        value={projectForm.completion_year}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, completion_year: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Image</label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                      {uploadingImage && (
                        <p className="text-sm text-gray-600">Uploading image...</p>
                      )}
                      <p className="text-sm text-gray-600">Or paste image URL:</p>
                      <input
                        type="url"
                        value={projectForm.image_url}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, image_url: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-500"
                        placeholder="https://example.com/image.jpg"
                      />
                      {projectForm.image_url && (
                        <img
                          src={projectForm.image_url}
                          alt="Preview"
                          className="mt-2 w-32 h-32 object-cover rounded"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, description: e.target.value })
                      }
                      rows="4"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="btn-primary" disabled={uploadingImage}>
                      {editingProject ? 'Update' : 'Create'} Project
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProjectForm(false)
                        setEditingProject(null)
                      }}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project.id} className="card overflow-hidden group">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded mb-4 transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-2">📍 {project.location}</p>
                    <p className="text-sm text-gold-600 font-semibold mb-2">{project.type}</p>
                    {project.completion_year && (
                      <p className="text-sm text-gray-500 mb-4">
                        Completed: {project.completion_year}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="btn-outline text-sm py-1 px-3 flex-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete('projects', project.id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded flex-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-600">
                  No projects yet. Add your first project!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Services Management</h2>
              <button
                onClick={() => {
                  setEditingService(null)
                  setServiceForm({
                    title: '',
                    description: '',
                    icon: '',
                  })
                  setShowServiceForm(true)
                }}
                className="btn-primary"
              >
                + Add Service
              </button>
            </div>

            {showServiceForm && (
              <div className="card mb-6">
                <h3 className="text-xl font-bold mb-4">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h3>
                <form onSubmit={handleServiceSubmit} className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-2">Title *</label>
                    <input
                      type="text"
                      required
                      value={serviceForm.title}
                      onChange={(e) =>
                        setServiceForm({ ...serviceForm, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Description *</label>
                    <textarea
                      required
                      value={serviceForm.description}
                      onChange={(e) =>
                        setServiceForm({ ...serviceForm, description: e.target.value })
                      }
                      rows="5"
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Icon (Emoji)</label>
                    <input
                      type="text"
                      value={serviceForm.icon}
                      onChange={(e) =>
                        setServiceForm({ ...serviceForm, icon: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gold-500"
                      placeholder="🏠"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Use an emoji or icon character (e.g., 🏠, 🏢, 🔨)
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="btn-primary">
                      {editingService ? 'Update' : 'Create'} Service
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowServiceForm(false)
                        setEditingService(null)
                      }}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.length > 0 ? (
                services.map((service) => (
                  <div key={service.id} className="card">
                    <div className="text-5xl mb-4">{service.icon || '🏗️'}</div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-700 mb-4">{service.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditService(service)}
                        className="btn-outline text-sm py-1 px-3 flex-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete('services', service.id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded flex-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-600">
                  No services yet. Add your first service!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
