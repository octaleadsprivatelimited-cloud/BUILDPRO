import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const sections = [
    { name: 'U.S.', path: '/section/us' },
    { name: 'World', path: '/section/world' },
    { name: 'Business', path: '/section/business' },
    { name: 'Arts', path: '/section/arts' },
    { name: 'Lifestyle', path: '/section/lifestyle' },
    { name: 'Opinion', path: '/section/opinion' },
  ]

  return (
    <footer className="bg-white border-t border-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="text-2xl font-bold mb-4">The Times</div>
            <p className="text-sm text-gray-600">
              Delivering quality journalism and in-depth analysis on the most important stories.
            </p>
          </div>

          {/* Sections */}
          <div>
            <h3 className="font-semibold mb-4">Sections</h3>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.path}>
                  <Link
                    to={section.path}
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Advertise
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} The Times. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
