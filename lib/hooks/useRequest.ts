'use client';

import { useEffect, useState } from 'react';
import { fetchApi, type ApiError, type FetchOptions } from '@/lib/api';

interface UseRequestState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseRequestOptions extends FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  skip?: boolean;
  auto?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

export function useRequest<T = any>(
  url?: string,
  options: UseRequestOptions = {}
) {
  const {
    method = 'GET',
    skip = false,
    auto = true,
    onSuccess,
    onError,
    ...fetchOptions
  } = options;

  const [state, setState] = useState<UseRequestState<T>>({
    data: null,
    loading: !skip && auto,
    error: null,
  });

  const execute = async (
    body?: any,
    executeOptions: UseRequestOptions & { url?: string } = {}
  ) => {
    const finalUrl = executeOptions.url || url;

    if (!finalUrl) {
      throw new Error('URL must be provided');
    }

    const finalMethod = executeOptions.method || method;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    const { data, error } = await fetchApi<T>(finalUrl, {
      method: finalMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      ...fetchOptions,
      ...executeOptions,
    });

    if (error) {
      setState((prev) => ({ ...prev, loading: false, error }));
      onError?.(error);
      return { data: null, error };
    }

    setState((prev) => ({ ...prev, loading: false, data: data || null }));
    if (data) onSuccess?.(data);
    return { data: data || null, error: null };
  };

  useEffect(() => {
    if (skip || !auto || !url) return;

    let isMounted = true;

    const fetchData = async () => {
      const { error, data } = await fetchApi<T>(url, {
        method,
        ...fetchOptions,
      });

      if (!isMounted) return;

      if (error) {
        setState((prev) => ({ ...prev, loading: false, error }));
        onError?.(error);
      } else {
        setState((prev) => ({ ...prev, loading: false, data: data || null }));
        if (data) onSuccess?.(data);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, method]);

  return {
    ...state,
    execute,
  };
}
