'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAsync } from '@/hooks/useAsync';
import { useLoadingState } from '@/hooks/useLoadingState';
import ErrorMessage from '@/components/ui/ErrorMessage';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { PageTransition } from '@/components/ui/animations/PageTransition';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Dynamically import the CollectionsWrapper component with no SSR
const CollectionsWrapper = dynamic(
  () => import('@/components/collections/CollectionsWrapper'),
  { ssr: false }
);

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: collections, error, execute } = useAsync<any[]>();
  const { isLoading, startLoading, stopLoading } = useLoadingState();

  // Simulated fetch function - replace with actual API call
  const fetchCollections = async () => {
    return [
      {
        id: 'school',
        name: 'School Uniforms',
        description: 'High-quality uniforms for educational institutions',
        image: '/images/school/girl.avif'
      },
      {
        id: 'security',
        name: 'Security Uniforms',
        description: 'Professional attire for security personnel',
        image: '/images/security/security 1.avif'
      },
      {
        id: 'sports',
        name: 'Sports Uniforms',
        description: 'Performance wear for athletes and teams',
        image: '/images/sports/jersey 14.webp'
      }
    ];
  };

  React.useEffect(() => {
    execute(fetchCollections);
  }, [execute]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage 
          message="Failed to load collections" 
          retry={() => execute(fetchCollections)}
        />
      </div>
    );
  }

  if (!collections) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const handleCategorySelect = async (category: string) => {
    startLoading();
    setSelectedCategory(category);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    stopLoading();
  };

  return (
    <Suspense fallback={<LoadingSpinner size="large" />}>
      <CollectionsWrapper />
      <PageTransition>
        <motion.div variants={container} initial="hidden" animate="show">
          <div className="container mx-auto px-4 py-8">
            <motion.h1 
              className="text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Collections
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <motion.div
                  key={collection.id}
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={`/collections/${collection.id}/catalog`}>
                    <div className="relative h-96 group overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 transition-opacity group-hover:opacity-90" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <h2 className="text-2xl font-bold mb-2">{collection.name}</h2>
                        <p className="text-sm opacity-90">{collection.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </PageTransition>
    </Suspense>
  );
}