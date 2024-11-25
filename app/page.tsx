import Image from 'next/image';
import Link from 'next/link';
import { PageTransition } from '@/components/ui/animations/PageTransition';
import { FadeIn } from '@/components/ui/animations/FadeIn';

export default function Home() {
  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <FadeIn delay={0.2} direction="up">
          <section className="relative h-screen flex items-center justify-center text-white">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/header/school.jpg"
                alt="Hero background"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>
            
            <div className="relative z-10 text-center px-4">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Premium Uniforms for Every Profession
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Quality, Comfort, and Professional Excellence
              </p>
              <Link
                href="/collections"
                className="bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-blue-800 transition-colors inline-block"
              >
                Explore Collections
              </Link>
            </div>
          </section>
        </FadeIn>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <FadeIn delay={0.3} direction="up">
              <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FadeIn key={feature.title} delay={0.1 * (index + 1)} direction="up">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <div className="text-blue-900 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <FadeIn delay={0.4} direction="up">
              <h2 className="text-4xl font-bold text-center mb-12">Our Collections</h2>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <FadeIn key={category.name} delay={0.1 * (index + 1)} direction="up">
                  <Link href={`/collections/${category.id}/catalog`}>
                    <div className="relative h-96 group overflow-hidden rounded-lg">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                          <p className="text-sm opacity-90">{category.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

const features = [
  {
    title: 'Premium Quality',
    description: 'Crafted with the finest materials for durability and comfort',
    icon: (
      <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Custom Sizing',
    description: 'Perfect fit guaranteed with our precise measurement system',
    icon: (
      <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping to your doorstep',
    icon: (
      <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const categories = [
  {
    id: 'school',
    name: 'School Uniforms',
    description: 'Professional attire for educational institutions',
    image: '/images/school/girl boy.avif',
  },
  {
    id: 'security',
    name: 'Security Uniforms',
    description: 'Durable uniforms for security personnel',
    image: '/images/security/security 1.avif',
  },
  {
    id: 'sports',
    name: 'Sports Uniforms',
    description: 'High-performance sportswear for teams',
    image: '/images/sports/jersey 27.webp',
  },
];
