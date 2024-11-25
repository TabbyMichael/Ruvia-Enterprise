'use client'

import { useState } from 'react'

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
      { name: 'Tactical Vest', price: '$89.99' },
      { name: 'Security Jacket', price: '$119.99' },
    ]
  },
  {
    id: 'sports',
    name: 'Sports Uniforms',
    description: 'High-performance sportswear for teams and athletes',
    items: [
      { name: 'Team Jersey Set', price: '$69.99' },
      { name: 'Professional Sports Kit', price: '$129.99' },
      { name: 'Training Uniform', price: '$59.99' },
    ]
  }
]

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
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeCategory === cat.id 
                  ? 'bg-blue-900 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
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
                  {category.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b">
                      <span>{item.name}</span>
                      <span className="font-semibold">{item.price}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-primary w-full mt-6">
                  View Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
