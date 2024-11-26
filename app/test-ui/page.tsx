'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAsync } from '@/hooks/useAsync';
import { simulateNetworkDelay, simulateError } from '@/utils/testUtils';
import { PageTransition } from '@/components/ui/animations/PageTransition';
import { DataFetchWrapper } from '@/components/ui/DataFetchWrapper';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

const demoData = [
  { id: 1, title: 'Item 1' },
  { id: 2, title: 'Item 2' },
  { id: 3, title: 'Item 3' },
];

export default function TestUI() {
  const [variant, setVariant] = useState<'fade' | 'slide' | 'scale'>('slide');
  const { data, error, execute } = useAsync<typeof demoData>();

  const loadData = () => execute(() => simulateNetworkDelay(demoData));
  const loadError = () => execute(() => simulateError());

  return (
    <PageTransition variant={variant}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">UI/UX Test Page</h1>

        {/* Test Page Transitions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Page Transitions</h2>
          <div className="flex gap-4">
            {(['fade', 'slide', 'scale'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-4 py-2 rounded-md ${
                  variant === v
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* Test Loading States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Loading States</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 border rounded-md">
              <h3 className="mb-2">Small</h3>
              <LoadingSpinner size="small" />
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="mb-2">Medium</h3>
              <LoadingSpinner size="medium" />
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="mb-2">Large</h3>
              <LoadingSpinner size="large" />
            </div>
          </div>
        </section>

        {/* Test Data Fetching */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Data Fetching</h2>
          <div className="flex gap-4 mb-4">
            <button
              onClick={loadData}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Load Data
            </button>
            <button
              onClick={loadError}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Simulate Error
            </button>
          </div>

          <div className="border rounded-md p-4">
            <DataFetchWrapper
              isLoading={!data && !error}
              error={error}
              data={data}
              onRetry={loadData}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                initial="hidden"
                animate="show"
              >
                {data?.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 }
                    }}
                    className="p-4 bg-white shadow-md rounded-md mb-4"
                  >
                    {item.title}
                  </motion.div>
                ))}
              </motion.div>
            </DataFetchWrapper>
          </div>
        </section>

        {/* Test Error Messages */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Error Messages</h2>
          <ErrorMessage
            message="This is a sample error message"
            retry={() => alert('Retry clicked')}
          />
        </section>
      </div>
    </PageTransition>
  );
}
