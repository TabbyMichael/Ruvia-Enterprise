'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PageTransition } from '@/components/ui/animations/PageTransition';
import { FadeIn } from '@/components/ui/animations/FadeIn';
import { SizeGuide } from '@/components/ui/SizeGuide';
import { products } from '@/data/products';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categoryProducts = products[params.category] || [];

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 capitalize">{params.category} Uniforms</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product) => (
            <FadeIn key={product.id}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Features:</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {product.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">{product.price}</span>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowSizeGuide(true);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Size Guide
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        {showSizeGuide && (
          <SizeGuide
            isOpen={showSizeGuide}
            onClose={() => setShowSizeGuide(false)}
            category={params.category}
            productName={selectedProduct?.name}
          />
        )}
      </div>
    </PageTransition>
  );
}
