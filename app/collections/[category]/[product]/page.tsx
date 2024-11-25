'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductPageProps {
  params: {
    category: string;
    product: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="relative aspect-square">
        <div className="sticky top-8">
          {/* Placeholder for product image */}
          <div className="aspect-square w-full bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Product Name</h1>
          <p className="text-xl text-gray-600 mt-2">$99.99</p>
        </div>

        {/* Size Selection */}
        <div>
          <h3 className="text-sm font-medium">Size</h3>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                className={`border rounded-md py-2 text-sm ${
                  selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div>
          <h3 className="text-sm font-medium">Color</h3>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {['Navy', 'Black', 'Gray', 'White'].map((color) => (
              <button
                key={color}
                className={`border rounded-md py-2 text-sm ${
                  selectedColor === color
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
            Add to Cart
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <Link 
              href={`/collections/${params.category}/${params.product}/customize`}
              className="w-full border border-black text-black py-3 rounded-md text-center hover:bg-gray-50"
            >
              Customize
            </Link>
            <Link 
              href={`/collections/${params.category}/${params.product}/size-guide`}
              className="w-full border border-black text-black py-3 rounded-md text-center hover:bg-gray-50"
            >
              Size Guide
            </Link>
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-sm">
          <h3>Description</h3>
          <p>
            Detailed product description will go here. This will include information
            about the material, fit, care instructions, and other relevant details.
          </p>
        </div>
      </div>
    </div>
  );
}
