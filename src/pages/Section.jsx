import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../config/supabase'

export default function Section() {
  const { category } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [category])

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('category', category)
        .order('published_at', { ascending: false })

      if (error) throw error
      setArticles(data || [])
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getCategoryLabel = (cat) => {
    const labels = {
      us: 'U.S.',
      world: 'World',
      business: 'Business',
      arts: 'Arts',
      lifestyle: 'Lifestyle',
      opinion: 'Opinion',
      tech: 'Tech',
      sports: 'Sports'
    }
    return labels[cat] || cat
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8 border-b border-gray-300 pb-4">
          {getCategoryLabel(category)}
        </h1>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} to={`/article/${article.slug}`} className="group">
                <article className="h-full flex flex-col">
                  {article.featured_image_url && (
                    <img
                      src={article.featured_image_url}
                      alt={article.title}
                      className="w-full h-64 object-cover mb-4 group-hover:opacity-90 transition-opacity"
                    />
                  )}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 group-hover:underline">
                      {article.title}
                    </h2>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="text-sm text-gray-500">
                      By {article.author} • {formatDate(article.published_at)}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found in this section.</p>
            <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

