import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../config/supabase'

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState([])
  const [latestArticles, setLatestArticles] = useState([])
  const [categoryArticles, setCategoryArticles] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch featured articles
      const { data: featured } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(3)

      // Fetch latest articles
      const { data: latest } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(12)

      // Fetch articles by category
      const categories = ['us', 'world', 'business', 'arts', 'lifestyle', 'opinion']
      const categoryData = {}
      
      for (const category of categories) {
        const { data } = await supabase
          .from('articles')
          .select('*')
          .eq('published', true)
          .eq('category', category)
          .order('published_at', { ascending: false })
          .limit(4)
        categoryData[category] = data || []
      }

      setFeaturedArticles(featured || [])
      setLatestArticles(latest || [])
      setCategoryArticles(categoryData)
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

  const getCategoryLabel = (category) => {
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
    return labels[category] || category
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
      {/* Featured Section */}
      {featuredArticles.length > 0 && (
        <section className="border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Featured */}
              {featuredArticles[0] && (
                <div className="lg:col-span-2">
                  <Link to={`/article/${featuredArticles[0].slug}`}>
                    {featuredArticles[0].featured_image_url && (
                      <img
                        src={featuredArticles[0].featured_image_url}
                        alt={featuredArticles[0].title}
                        className="w-full h-96 object-cover mb-4"
                      />
                    )}
                    <h1 className="text-4xl font-bold mb-3 hover:underline">
                      {featuredArticles[0].title}
                    </h1>
                    <p className="text-lg text-gray-700 mb-2">
                      {featuredArticles[0].excerpt}
                    </p>
                    <div className="text-sm text-gray-500">
                      By {featuredArticles[0].author} • {formatDate(featuredArticles[0].published_at)}
                    </div>
                  </Link>
                </div>
              )}

              {/* Side Featured */}
              <div className="space-y-6">
                {featuredArticles.slice(1, 3).map((article) => (
                  <Link key={article.id} to={`/article/${article.slug}`}>
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="text-xl font-bold mb-2 hover:underline">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {article.excerpt}
                      </p>
                      <div className="text-xs text-gray-500">
                        {formatDate(article.published_at)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2">
          Latest News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <Link key={article.id} to={`/article/${article.slug}`} className="group">
              <article className="h-full flex flex-col">
                {article.featured_image_url && (
                  <img
                    src={article.featured_image_url}
                    alt={article.title}
                    className="w-full h-48 object-cover mb-3 group-hover:opacity-90 transition-opacity"
                  />
                )}
                <div className="flex-1">
                  <span className="text-xs font-semibold text-gray-600 uppercase">
                    {getCategoryLabel(article.category)}
                  </span>
                  <h3 className="text-xl font-bold mt-1 mb-2 group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="text-xs text-gray-500">
                    By {article.author} • {formatDate(article.published_at)}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Sections */}
      {Object.entries(categoryArticles).map(([category, articles]) => {
        if (articles.length === 0) return null
        return (
          <section key={category} className="border-t border-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {getCategoryLabel(category)}
                </h2>
                <Link
                  to={`/section/${category}`}
                  className="text-sm font-semibold text-gray-700 hover:underline"
                >
                  More →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {articles.map((article) => (
                  <Link key={article.id} to={`/article/${article.slug}`} className="group">
                    <article>
                      {article.featured_image_url && (
                        <img
                          src={article.featured_image_url}
                          alt={article.title}
                          className="w-full h-40 object-cover mb-3 group-hover:opacity-90 transition-opacity"
                        />
                      )}
                      <h3 className="text-lg font-bold mb-2 group-hover:underline">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="text-xs text-gray-500">
                        {formatDate(article.published_at)}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
