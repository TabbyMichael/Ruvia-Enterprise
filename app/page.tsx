import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-32 min-h-[91.9vh] flex items-center">
        <div className="main-container text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 max-w-5xl mx-auto leading-tight">
            Premium Uniforms for Every Professional Need
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto">
            Elevating standards with quality, comfort, and style
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/collections" className="btn-primary text-lg px-8 py-4">
              View Collections
            </Link>
            <Link href="/customize" className="btn-secondary text-lg px-8 py-4">
              Custom Order
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="main-container">
          <h2 className="text-3xl font-bold text-center mb-12">Premium Uniform Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* School Uniforms Card */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-100 to-blue-50">
                <div className="p-6">
                  <div className="h-40 w-40 mx-auto mb-4">
                    <svg className="w-full h-full text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">School Uniforms</h3>
                <p className="text-gray-600 mb-4">Classic and comfortable uniforms for educational institutions</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>Premium fabric quality</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>Customizable designs</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>Bulk ordering available</span>
                  </div>
                </div>
                <Link href="/collections?category=school" className="mt-6 w-full btn-primary block text-center">
                  Explore School Collection
                </Link>
              </div>
            </div>

            {/* Security Uniforms Card */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-100 to-gray-50">
                <div className="p-6">
                  <div className="h-40 w-40 mx-auto mb-4">
                    <svg className="w-full h-full text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 8L2 22" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.5 15H9" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Security Uniforms</h3>
                <p className="text-gray-600 mb-4">Professional attire for security personnel</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>Durable materials</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>Professional design</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>Weather-resistant options</span>
                  </div>
                </div>
                <Link href="/collections?category=security" className="mt-6 w-full btn-primary block text-center">
                  Explore Security Collection
                </Link>
              </div>
            </div>

            {/* Sports Uniforms Card */}
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-green-100 to-green-50">
                <div className="p-6">
                  <div className="h-40 w-40 mx-auto mb-4">
                    <svg className="w-full h-full text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6l4 2" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sports Uniforms</h3>
                <p className="text-gray-600 mb-4">High-performance sportswear for teams and athletes</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>Moisture-wicking fabric</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>Team customization</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span>Performance oriented</span>
                  </div>
                </div>
                <Link href="/collections?category=sports" className="mt-6 w-full btn-primary block text-center">
                  Explore Sports Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="main-container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Ruvia Enterprise?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Finest materials and craftsmanship for lasting comfort</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
              <p className="text-gray-600">Tailored solutions for your specific requirements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping worldwide</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
