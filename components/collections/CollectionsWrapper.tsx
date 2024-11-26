'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CollectionsContent from './CollectionsContent';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function CollectionsSearchWrapper() {
  const searchParams = useSearchParams();
  return <CollectionsContent initialCategory={searchParams.get('category')} />;
}

export default function CollectionsWrapper() {
  return (
    <Suspense fallback={<LoadingSpinner size="large" />}>
      <CollectionsSearchWrapper />
    </Suspense>
  );
}
