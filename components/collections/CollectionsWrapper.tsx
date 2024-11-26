'use client';

import { useSearchParams } from 'next/navigation';
import CollectionsContent from './CollectionsContent';

export default function CollectionsWrapper() {
  const searchParams = useSearchParams();
  return <CollectionsContent initialCategory={searchParams.get('category')} />;
}
