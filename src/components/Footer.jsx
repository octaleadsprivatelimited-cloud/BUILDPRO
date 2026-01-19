import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-gold-500">BUILD</span>
              <span className="text-white">PRO</span>
            </div>
            <p className="text-gray-400 mb-4">
              Building trust. Delivering excellence. Your premier construction partner.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold-500 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-gold-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-gold-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-gold-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-gold-500 transition-colors">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gold-500 font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Residential Construction</li>
              <li>Commercial Projects</li>
              <li>Renovation & Remodeling</li>
              <li>Project Management</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gold-500 font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📧 info@buildpro.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 123 Construction Ave, City, State 12345</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} BuildPro Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

