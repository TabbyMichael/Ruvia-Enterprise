'use client';

import { useSearchParams } from 'next/navigation';
import AuthContent from './AuthContent';

export default function AuthWrapper() {
  const searchParams = useSearchParams();
  return <AuthContent initialMode={searchParams.get('mode') as 'signIn' | 'signUp' | 'phone' | null} />;
}
