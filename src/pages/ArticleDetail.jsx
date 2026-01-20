import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../config/supabase'

export default function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedArticles, setRelatedArticles] = useState([])

  useEffect(() => {
    fetchArticle()
  }, [slug])

  const fetchArticle = async () => {
    try {
      // Fetch article by slug
      const { data: articleData, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error) throw error

      setArticle(articleData)

      // Fetch related articles
      if (articleData) {
        const { data: related } = await supabase
          .from('articles')
          .select('*')
          .eq('published', true)
          .eq('category', articleData.category)
          .neq('id', articleData.id)
          .order('published_at', { ascending: false })
          .limit(3)

        setRelatedArticles(related || [])
      }
    } catch (error) {
      console.error('Error fetching article:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
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

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <Link
            to={`/section/${article.category}`}
            className="text-sm font-semibold text-gray-600 uppercase hover:underline"
          >
            {getCategoryLabel(article.category)}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-600 border-b border-gray-300 pb-4">
            <span>By {article.author}</span>
            <span>•</span>
            <time>{formatDate(article.published_at)}</time>
          </div>
        </header>

        {/* Featured Image */}
        {article.featured_image_url && (
          <figure className="mb-8">
            <img
              src={article.featured_image_url}
              alt={article.title}
              className="w-full h-auto"
            />
          </figure>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-lg leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-300">
          <div className="text-sm text-gray-600">
            <p>By {article.author}</p>
            <p className="mt-2">{formatDate(article.published_at)}</p>
          </div>
        </footer>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-gray-300 bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">More from {getCategoryLabel(article.category)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related.id} to={`/article/${related.slug}`} className="group">
                  <article>
                    {related.featured_image_url && (
                      <img
                        src={related.featured_image_url}
                        alt={related.title}
                        className="w-full h-48 object-cover mb-3 group-hover:opacity-90 transition-opacity"
                      />
                    )}
                    <h3 className="text-lg font-bold mb-2 group-hover:underline">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

