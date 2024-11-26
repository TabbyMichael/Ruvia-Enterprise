'use client';

import { ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface DataFetchWrapperProps<T> {
  isLoading: boolean;
  error: Error | null;
  data: T | null;
  onRetry?: () => void;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  children: ReactNode;
}

export function DataFetchWrapper<T>({
  isLoading,
  error,
  data,
  onRetry,
  loadingComponent,
  errorComponent,
  children,
}: DataFetchWrapperProps<T>) {
  if (isLoading) {
    return loadingComponent || (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return errorComponent || (
      <div className="min-h-[200px] flex items-center justify-center">
        <ErrorMessage
          message={error.message || 'An error occurred while fetching data'}
          retry={onRetry}
        />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return <>{children}</>;
}
