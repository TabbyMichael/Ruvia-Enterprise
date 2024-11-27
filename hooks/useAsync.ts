'use client';

import { useState, useCallback } from 'react';
import { useLoading } from '@/context/LoadingContext';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
  });

  const { showLoader, hideLoader } = useLoading();

  const execute = useCallback(
    async (asyncFunction: () => Promise<T>) => {
      try {
        setState({ data: null, error: null });
        showLoader();
        const data = await asyncFunction();
        setState({ data, error: null });
        return data;
      } catch (error) {
        setState({ data: null, error: error as Error });
        throw error;
      } finally {
        hideLoader();
      }
    },
    [showLoader, hideLoader]
  );

  return {
    ...state,
    execute,
  };
}
