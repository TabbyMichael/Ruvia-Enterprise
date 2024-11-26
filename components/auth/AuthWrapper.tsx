'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthContent from './AuthContent';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function AuthSearchWrapper() {
  const searchParams = useSearchParams();
  return <AuthContent initialMode={searchParams.get('mode') as 'signIn' | 'signUp' | 'phone' | null} />;
}

export default function AuthWrapper() {
  return (
    <Suspense fallback={<LoadingSpinner size="large" />}>
      <AuthSearchWrapper />
    </Suspense>
  );
}
