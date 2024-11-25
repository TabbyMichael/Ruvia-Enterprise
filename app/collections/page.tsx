'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PageTransition } from '@/components/ui/animations/PageTransition';
import { FadeIn } from '@/components/ui/animations/FadeIn';
import { SizeGuide } from '@/components/ui/SizeGuide';

const categories = [
  {
    id: 'school',
    name: 'School Uniforms',
    description: 'Professional and comfortable uniforms for educational institutions',
    items: [
      { name: 'Classic School Uniform Set', price: '' },
      { name: 'Premium Blazer', price: '' },
      { name: 'School Sports Kit', price: '' },
    ]
  },
  {
    id: 'security',
    name: 'Security Uniforms',
    description: 'Durable and professional security personnel attire',
    items: [
      { name: 'Security Guard Complete Set', price: '' },
      { name: 'Professional Security Jacket', price: '' },
      { name: 'Security Patrol Pants', price: '' },
    ]
  },
  {
    id: 'sports',
    name: 'Sports Uniforms',
    description: 'High-performance sportswear for teams and athletes',
    items: [
      { name: 'Team Training Uniform', price: '' },
      { name: 'Athletic Performance Shirt', price: '' },
      { name: 'Training Uniform', price: '' },
    ]
  }
]

const conversionRate = 40;

const dummyProducts = {
  'school': [
    {
      id: '1',
      name: 'Classic School Uniform Set',
      price: `KSH ${Math.round(89.99 * conversionRate)}`,
      image: '/images/sports/jersey18.webp',
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Premium Blazer',
      price: `KSH ${Math.round(129.99 * conversionRate)}`,
      image: '/images/sports/jersey23.webp',
      rating: 4.7,
    },
    {
      id: '3',
      name: 'School Sports Kit',
      price: `KSH ${Math.round(79.99 * conversionRate)}`,
      image: '/images/sports/jersey5.webp',
      rating: 4.3,
    }
  ],
  'security': [
    {
      id: '4',
      name: 'Security Guard Complete Set',
      price: `KSH ${Math.round(149.99 * conversionRate)}`,
      image: '/images/security/security 1.avif',
      rating: 4.6,
    },
    {
      id: '5',
      name: 'Professional Security Jacket',
      price: `KSH ${Math.round(99.99 * conversionRate)}`,
      image: '/images/security-jacket.jpg',
      rating: 4.4,
    },
    {
      id: '6',
      name: 'Security Patrol Pants',
      price: `KSH ${Math.round(69.99 * conversionRate)}`,
      image: '/images/security-pants.jpg',
      rating: 4.2,
    }
  ],
  'sports': [
    {
      id: '7',
      name: 'Team Training Uniform',
      price: `KSH ${Math.round(89.99 * conversionRate)}`,
      image: '/images/team-uniform.jpg',
      rating: 4.5,
    },
    {
      id: '8',
      name: 'Athletic Performance Shirt',
      price: `KSH ${Math.round(59.99 * conversionRate)}`,
      image: '/images/performance-shirt.jpg',
      rating: 4.7,
    },
    {
      id: '9',
      name: 'Sports Compression Shorts',
      price: `KSH ${Math.round(44.99 * conversionRate)}`,
      image: '/images/compression-shorts.jpg',
      rating: 4.3,
    }
  ]
};

export default function Collections() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <FadeIn delay={0.2} direction="up">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Collections</h1>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <FadeIn key={category.id} delay={0.1 * (index + 1)} direction="up">
              <Link href={`/collections/${category.id}/catalog`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <Image
                      src={`/images/${category.id}-uniform.jpg`}
                      alt={category.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="space-y-2">
                      {category.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">{item.name}</span>
                          <span className="text-sm font-medium text-gray-900">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <SizeGuide isOpen={false} onClose={function (): void {
                        throw new Error('Function not implemented.');
                      } } category={''} />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
