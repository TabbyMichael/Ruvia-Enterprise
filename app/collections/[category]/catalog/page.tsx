'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

const generateProducts = (category: string): Product[] => {
  const baseProducts = {
    'school': [
      {
        baseName: 'School Uniform Set',
        basePrice: 89.99,
        baseImage: '/images/school-uniform.jpg',
      },
      {
        baseName: 'Premium Blazer',
        basePrice: 129.99,
        baseImage: '/images/blazer.jpg',
      },
      {
        baseName: 'School Sports Kit',
        basePrice: 79.99,
        baseImage: '/images/sports-kit.jpg',
      }
    ],
    'security': [
      {
        baseName: 'Security Guard Set',
        basePrice: 149.99,
        baseImage: '/images/security-uniform.jpg',
      },
      {
        baseName: 'Professional Jacket',
        basePrice: 99.99,
        baseImage: '/images/security-jacket.jpg',
      },
      {
        baseName: 'Security Patrol Pants',
        basePrice: 69.99,
        baseImage: '/images/security-pants.jpg',
      }
    ],
    'sports': [
      {
        baseName: 'Team Training Uniform',
        basePrice: 89.99,
        baseImage: '/images/team-uniform.jpg',
      },
      {
        baseName: 'Athletic Performance Shirt',
        basePrice: 59.99,
        baseImage: '/images/performance-shirt.jpg',
      },
      {
        baseName: 'Sports Compression Shorts',
        basePrice: 44.99,
        baseImage: '/images/compression-shorts.jpg',
      }
    ]
  }[category];

  return Array.from({ length: 36 }, (_, index) => {
    const baseProduct = baseProducts[index % baseProducts.length];
    return {
      id: `${category}-${index + 1}`,
      name: `${baseProduct.baseName} ${index + 1}`,
      price: baseProduct.basePrice + (Math.floor(index / 3) * 5),
      image: baseProduct.baseImage,
      rating: Math.min(5, 3 + Math.random()),
    };
  });
};

export default function CatalogPage() {
  const params = useParams();
  const category = params.category as string;
  const allProducts = generateProducts(category);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000 });
  const productsPerPage = 12;

  // Filtering and Sorting
  const filteredProducts = allProducts.filter(
    product => product.price >= priceFilter.min && product.price <= priceFilter.max
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold capitalize">{category} Catalog</h1>
        
        {/* Sorting and Filtering */}
        <div className="flex space-x-4">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-2 py-1"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          <div className="flex items-center space-x-2">
            <input 
              type="number" 
              placeholder="Min" 
              value={priceFilter.min}
              onChange={(e) => setPriceFilter(prev => ({ ...prev, min: Number(e.target.value) }))}
              className="w-20 border rounded-md px-2 py-1"
            />
            <input 
              type="number" 
              placeholder="Max" 
              value={priceFilter.max}
              onChange={(e) => setPriceFilter(prev => ({ ...prev, max: Number(e.target.value) }))}
              className="w-20 border rounded-md px-2 py-1"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col h-full hover:shadow-lg transition-shadow">
            <div className="flex-grow">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="object-cover rounded-md mb-4 w-full h-48"
              />
              <h2 className="text-lg font-medium">{product.name}</h2>
              <p className="text-gray-600 font-semibold">${product.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">{'★'.repeat(Math.round(product.rating))}</span>
                <span className="ml-2 text-sm text-gray-500">({product.rating.toFixed(1)})</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-md ${
              currentPage === page 
                ? 'bg-black text-white' 
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
