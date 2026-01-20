import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'

export default function AdminArticles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const [notification, setNotification] = useState({ type: '', message: '' })
  const navigate = useNavigate()

  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'us',
    section: '',
    featured_image_url: '',
    published: false,
    featured: false,
    published_at: '',
  })

  const categories = [
    { value: 'us', label: 'U.S.' },
    { value: 'world', label: 'World' },
    { value: 'business', label: 'Business' },
    { value: 'arts', label: 'Arts' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'opinion', label: 'Opinion' },
    { value: 'tech', label: 'Tech' },
    { value: 'sports', label: 'Sports' },
  ]

  useEffect(() => {
    fetchArticles()
  }, [])

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification({ type: '', message: '' }), 3000)
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setArticles(data || [])
    } catch (error) {
      console.error('Error fetching articles:', error)
      showNotification('error', 'Failed to fetch articles')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!articleForm.title || !articleForm.content || !articleForm.author) {
      showNotification('error', 'Please fill in all required fields')
      return
    }

    try {
      const articleData = {
        title: articleForm.title.trim(),
        slug: articleForm.slug || generateSlug(articleForm.title),
        excerpt: articleForm.excerpt?.trim() || null,
        content: articleForm.content.trim(),
        author: articleForm.author.trim(),
        category: articleForm.category,
        section: articleForm.section?.trim() || null,
        featured_image_url: articleForm.featured_image_url?.trim() || null,
        published: articleForm.published,
        featured: articleForm.featured,
        published_at: articleForm.published && articleForm.published_at
          ? articleForm.published_at
          : articleForm.published
          ? new Date().toISOString()
          : null,
      }

      if (editingArticle) {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', editingArticle.id)

        if (error) throw error
        showNotification('success', 'Article updated successfully')
      } else {
        const { error } = await supabase.from('articles').insert([articleData])
        if (error) throw error
        showNotification('success', 'Article created successfully')
      }

      setShowForm(false)
      setEditingArticle(null)
      setArticleForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: '',
        category: 'us',
        section: '',
        featured_image_url: '',
        published: false,
        featured: false,
        published_at: '',
      })
      fetchArticles()
    } catch (error) {
      console.error('Error saving article:', error)
      showNotification('error', `Failed to save article: ${error.message || 'Unknown error'}`)
    }
  }

  const handleEdit = (article) => {
    setEditingArticle(article)
    setArticleForm({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt || '',
      content: article.content,
      author: article.author,
      category: article.category,
      section: article.section || '',
      featured_image_url: article.featured_image_url || '',
      published: article.published || false,
      featured: article.featured || false,
      published_at: article.published_at
        ? new Date(article.published_at).toISOString().slice(0, 16)
        : '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    try {
      const { error } = await supabase.from('articles').delete().eq('id', id)
      if (error) throw error
      showNotification('success', 'Article deleted successfully')
      fetchArticles()
    } catch (error) {
      console.error('Error deleting article:', error)
      showNotification('error', 'Failed to delete article')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {notification.message && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Article Management</h1>
            <div className="flex items-center gap-4">
              <a href="/" target="_blank" className="text-gray-600 hover:text-black">
                View Site
              </a>
              <button onClick={handleLogout} className="btn-primary text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Articles</h2>
          <button
            onClick={() => {
              setEditingArticle(null)
              setArticleForm({
                title: '',
                slug: '',
                excerpt: '',
                content: '',
                author: '',
                category: 'us',
                section: '',
                featured_image_url: '',
                published: false,
                featured: false,
                published_at: '',
              })
              setShowForm(true)
            }}
            className="btn-primary"
          >
            + New Article
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">
              {editingArticle ? 'Edit Article' : 'Create New Article'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) => {
                      setArticleForm({
                        ...articleForm,
                        title: e.target.value,
                        slug: articleForm.slug || generateSlug(e.target.value),
                      })
                    }}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Slug</label>
                  <input
                    type="text"
                    value={articleForm.slug}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, slug: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Auto-generated from title"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Author *</label>
                  <input
                    type="text"
                    required
                    value={articleForm.author}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, author: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Category *</label>
                  <select
                    required
                    value={articleForm.category}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-2">Section</label>
                  <input
                    type="text"
                    value={articleForm.section}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, section: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                    placeholder="e.g., Politics, Health, Movies"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Published Date</label>
                  <input
                    type="datetime-local"
                    value={articleForm.published_at}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, published_at: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-2">Excerpt</label>
                <textarea
                  value={articleForm.excerpt}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, excerpt: e.target.value })
                  }
                  rows="2"
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Short summary of the article"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Content *</label>
                <textarea
                  required
                  value={articleForm.content}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, content: e.target.value })
                  }
                  rows="15"
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Full article content"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Featured Image URL</label>
                <input
                  type="url"
                  value={articleForm.featured_image_url}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, featured_image_url: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={articleForm.published}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, published: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Published
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={articleForm.featured}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, featured: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Featured
                </label>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  {editingArticle ? 'Update' : 'Create'} Article
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingArticle(null)
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Articles List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium">{article.title}</div>
                    {article.featured && (
                      <span className="text-xs text-yellow-600">⭐ Featured</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {categories.find((c) => c.value === article.category)?.label ||
                      article.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{article.author}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        article.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(article)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {articles.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              No articles yet. Create your first article!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

