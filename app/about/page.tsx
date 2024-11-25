'use client'

export default function About() {
  return (
    <div className="py-8">
      <div className="main-container">
        <h1 className="text-4xl font-bold text-center mb-12">About Ruvia Enterprise</h1>
        
        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg">
            At Ruvia Enterprise, we are dedicated to elevating professional identity through premium uniforms. 
            We believe that well-designed, high-quality uniforms play a crucial role in fostering unity, 
            professionalism, and confidence in educational institutions, security services, and sports organizations.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-gray-600">
              We use premium materials and maintain strict quality control to ensure durability and comfort.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We continuously innovate our designs and materials to meet evolving needs.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Service</h3>
            <p className="text-gray-600">
              We provide exceptional customer service and support throughout your journey with us.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'John Smith', role: 'CEO', bio: 'Over 20 years of experience in textile manufacturing.' },
              { name: 'Sarah Johnson', role: 'Head of Design', bio: 'Award-winning designer with focus on functional fashion.' },
              { name: 'Michael Chen', role: 'Operations Director', bio: 'Expert in sustainable manufacturing practices.' },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-900 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Ready to Elevate Your Professional Identity?</h2>
          <p className="text-gray-600 mb-6">
            Discover our premium uniform collections or create your custom design today.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="btn-primary">View Collections</button>
            <button className="btn-secondary">Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  )
}
