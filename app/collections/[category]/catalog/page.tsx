'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import SizeGuide from '@/components/SizeGuide';
import { useCart } from '@/context/CartContext';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  category: string;
  description: string;
  features: string[];
}

const ITEMS_PER_PAGE = 12;
const conversionRate = 40;

const generateProducts = (category: string): Product[] => {
  const baseProducts = {
    'school': [
      {
        baseName: 'School Uniform Set',
        basePrice: `KSH ${Math.round(89.99 * conversionRate)}`,
        baseImage: '/public/images/school/girl boy.avif',
        category: 'school',
        description: 'School uniform set',
        features: ['Cotton fabric', 'Comfortable fit', 'Durable']
      },
      {
        baseName: 'Premium Blazer',
        basePrice: `KSH ${Math.round(129.99 * conversionRate)}`,
        baseImage: '/public/images/school/blazer 2.avif',
        category: 'school',
        description: 'Premium blazer',
        features: ['Wool fabric', 'Slim fit', 'Stylish']
      },
      {
        baseName: 'School Sports Kit',
        basePrice: `KSH ${Math.round(79.99 * conversionRate)}`,
        baseImage: '/public/images/sports/jersey 1.webp',
        category: 'school',
        description: 'School sports kit',
        features: ['Polyester fabric', 'Breathable', 'Moisture-wicking']
      }
    ],
    'security': [
      {
        baseName: 'Security Guard Set',
        basePrice: `KSH ${Math.round(149.99 * conversionRate)}`,
        baseImage: '/images/security-uniform.jpg',
        category: 'security',
        description: 'Security guard set',
        features: ['Cotton fabric', 'Comfortable fit', 'Durable']
      },
      {
        baseName: 'Professional Jacket',
        basePrice: `KSH ${Math.round(99.99 * conversionRate)}`,
        baseImage: '/images/security-jacket.jpg',
        category: 'security',
        description: 'Professional jacket',
        features: ['Wool fabric', 'Slim fit', 'Stylish']
      },
      {
        baseName: 'Security Patrol Pants',
        basePrice: `KSH ${Math.round(69.99 * conversionRate)}`,
        baseImage: '/images/security-pants.jpg',
        category: 'security',
        description: 'Security patrol pants',
        features: ['Polyester fabric', 'Breathable', 'Moisture-wicking']
      }
    ],
    'sports': [
      {
        baseName: 'Team Training Uniform',
        basePrice: `KSH ${Math.round(89.99 * conversionRate)}`,
        baseImage: '/public/images/sports/jersey 1.webp',
        category: 'sports',
        description: 'Team training uniform',
        features: ['Polyester fabric', 'Breathable', 'Moisture-wicking']
      },
      {
        baseName: 'Athletic Performance Shirt',
        basePrice: `KSH ${Math.round(59.99 * conversionRate)}`,
        baseImage: '/public/images/sports/jersey 2.webp',
        category: 'sports',
        description: 'Athletic performance shirt',
        features: ['Moisture-wicking fabric', 'Breathable', 'Four-way stretch']
      },
      {
        baseName: 'Sports Compression Shorts',
        basePrice: `KSH ${Math.round(44.99 * conversionRate)}`,
        baseImage: '/public/images/sports/jersey 4.webp',
        category: 'sports',
        description: 'Sports compression shorts',
        features: ['Moisture-wicking fabric', 'Breathable', 'Four-way stretch']
      }
    ]
  }[category];

  return Array.from({ length: 36 }, (_, index) => {
    const baseProduct = baseProducts[index % baseProducts.length];
    return {
      id: `${category}-${index + 1}`,
      name: `${baseProduct.baseName} ${index + 1}`,
      price: `KSH ${Math.round(Number(baseProduct.basePrice.replace('KSH ', '')) + (Math.floor(index / 3) * 5 * conversionRate))}`,
      image: baseProduct.baseImage,
      rating: Math.min(5, 3 + Math.random()),
      category: baseProduct.category,
      description: baseProduct.description,
      features: baseProduct.features
    };
  });
};

export default function CatalogPage() {
  const params = useParams();
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const allProducts = generateProducts(category || '');

  const [selectedSizes, setSelectedSizes] = useState<{[key: string]: string}>({});
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();
  
  const categoryProducts = allProducts.filter(
    (product) => product.category === category
  );

  // Calculate pagination
  const totalPages = Math.ceil(categoryProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = categoryProducts.slice(startIndex, endIndex);

  const handleAddToCart = (product: any) => {
    const size = selectedSizes[product.id];
    if (!size) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price.replace('KSH ', '')),
      image: product.image,
      size,
      quantity: 1,
    });

    setSelectedSizes({
      ...selectedSizes,
      [product.id]: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12 capitalize">
        {params.category} Uniforms
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Features:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">
                    {product.price}
                  </span>
                  <button 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => setIsSizeGuideOpen(true)}
                  >
                    Size Guide
                  </button>
                </div>

                <div className="flex space-x-2">
                  <select
                    className="flex-1 border rounded-md px-3 py-2"
                    value={selectedSizes[product.id] || ''}
                    onChange={(e) => setSelectedSizes({
                      ...selectedSizes,
                      [product.id]: e.target.value
                    })}
                  >
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="2XL">2XL</option>
                  </select>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-200"
                    disabled={!selectedSizes[product.id]}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-12">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-md ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'border hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}

      <SizeGuide
        isOpen={isSizeGuideOpen}
        closeModal={() => setIsSizeGuideOpen(false)}
        category={category || ''}
      />
    </div>
  )
}
