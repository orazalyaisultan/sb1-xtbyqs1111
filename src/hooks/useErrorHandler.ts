import { useState, useCallback } from 'react';

interface ErrorState {
  message: string;
  code?: string;
}

export function useErrorHandler() {
  const [error, setErrorState] = useState<ErrorState | null>(null);

  const setError = useCallback((err: unknown) => {
    if (err instanceof Error) {
      setErrorState({ message: err.message });
    } else if (typeof err === 'string') {
      setErrorState({ message: err });
    } else {
      setErrorState({ message: 'An unexpected error occurred' });
    }
  }, []);

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  return {
    error,
    setError,
    clearError
  };
}