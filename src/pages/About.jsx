export default function About() {
  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '500+', label: 'Projects Completed' },
    { number: '1000+', label: 'Happy Clients' },
    { number: '50+', label: 'Expert Team Members' },
  ]

  const team = [
    {
      name: 'John Anderson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      name: 'Sarah Martinez',
      role: 'Project Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Construction',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
    {
      name: 'Emily Johnson',
      role: 'Design Lead',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-gold-500">BuildPro</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Leading the construction industry with innovation, quality, and unwavering commitment to excellence.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 text-lg">
                Founded in 2008, BuildPro Construction has grown from a small local contractor to a trusted name in the construction industry. We specialize in delivering high-quality residential and commercial projects that exceed expectations.
              </p>
              <p className="text-gray-700 mb-4 text-lg">
                Our team of experienced professionals brings together decades of combined expertise in construction, design, and project management. We pride ourselves on maintaining the highest standards of craftsmanship while ensuring timely project delivery.
              </p>
              <p className="text-gray-700 text-lg">
                At BuildPro, we don't just build structures—we build relationships, communities, and dreams.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f836057?w=800"
                alt="Construction site"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="card">
              <h3 className="text-3xl font-bold mb-4 text-gold-600">Our Mission</h3>
              <p className="text-gray-700 text-lg">
                To deliver exceptional construction services that transform visions into reality, while maintaining the highest standards of quality, safety, and customer satisfaction. We are committed to building lasting relationships with our clients through transparency, integrity, and excellence.
              </p>
            </div>
            <div className="card">
              <h3 className="text-3xl font-bold mb-4 text-gold-600">Our Vision</h3>
              <p className="text-gray-700 text-lg">
                To be the most trusted and innovative construction company in the region, recognized for our commitment to sustainable building practices, cutting-edge technology, and creating spaces that inspire and endure for generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our <span className="text-gold-600">Achievements</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-gold-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-xl text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-100">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">
            Our <span className="text-gold-600">Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gold-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

