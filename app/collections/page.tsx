'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'

const categories = [
  {
    id: 'school',
    name: 'School Uniforms',
    description: 'Professional and comfortable uniforms for educational institutions',
    items: [
      { name: 'Classic School Uniform Set', price: '$89.99' },
      { name: 'Premium Blazer', price: '$129.99' },
      { name: 'School Sports Kit', price: '$79.99' },
    ]
  },
  {
    id: 'security',
    name: 'Security Uniforms',
    description: 'Durable and professional security personnel attire',
    items: [
      { name: 'Security Guard Complete Set', price: '$149.99' },
      { name: 'Professional Security Jacket', price: '$99.99' },
      { name: 'Security Patrol Pants', price: '$69.99' },
    ]
  },
  {
    id: 'sports',
    name: 'Sports Uniforms',
    description: 'High-performance sportswear for teams and athletes',
    items: [
      { name: 'Team Training Uniform', price: '$89.99' },
      { name: 'Athletic Performance Shirt', price: '$59.99' },
      { name: 'Training Uniform', price: '$59.99' },
    ]
  }
]

const dummyProducts = {
  'school': [
    {
      id: '1',
      name: 'Classic School Uniform Set',
      price: 89.99,
      image: '/images/school-uniform.jpg',
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Premium Blazer',
      price: 129.99,
      image: '/images/blazer.jpg',
      rating: 4.7,
    },
    {
      id: '3',
      name: 'School Sports Kit',
      price: 79.99,
      image: '/images/sports-kit.jpg',
      rating: 4.3,
    }
  ],
  'security': [
    {
      id: '4',
      name: 'Security Guard Complete Set',
      price: 149.99,
      image: '/images/security-uniform.jpg',
      rating: 4.6,
    },
    {
      id: '5',
      name: 'Professional Security Jacket',
      price: 99.99,
      image: '/images/security-jacket.jpg',
      rating: 4.4,
    },
    {
      id: '6',
      name: 'Security Patrol Pants',
      price: 69.99,
      image: '/images/security-pants.jpg',
      rating: 4.2,
    }
  ],
  'sports': [
    {
      id: '7',
      name: 'Team Training Uniform',
      price: 89.99,
      image: '/images/team-uniform.jpg',
      rating: 4.5,
    },
    {
      id: '8',
      name: 'Athletic Performance Shirt',
      price: 59.99,
      image: '/images/performance-shirt.jpg',
      rating: 4.7,
    },
    {
      id: '9',
      name: 'Sports Compression Shorts',
      price: 44.99,
      image: '/images/compression-shorts.jpg',
      rating: 4.3,
    }
  ]
};

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredCategories = activeCategory === 'all' 
    ? categories 
    : categories.filter(cat => cat.id === activeCategory)

  return (
    <div className="py-8">
      <div className="main-container">
        <h1 className="text-4xl font-bold text-center mb-8">Our Collections</h1>
        
        {/* Category Filter */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === 'all' 
                ? 'bg-blue-900 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <Link 
              key={cat.id}
              href={`/collections/${cat.id}/catalog`}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeCategory === cat.id 
                  ? 'bg-blue-900 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="space-y-2">
                  {dummyProducts[category.id].map((product) => (
                    <div key={product.id} className="flex justify-between items-center py-2 border-b">
                      <span>{product.name}</span>
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  href={`/collections/${category.id}/catalog`} 
                  className="btn-primary w-full mt-6 inline-block text-center"
                >
                  View Collection
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
