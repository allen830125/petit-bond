export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface FetchOptions extends RequestInit {
  timeout?: number;
}

async function fetchApi<T>(
  url: string,
  options: FetchOptions = {}
): Promise<{ data?: T; error?: ApiError }> {
  const { timeout = 5000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as ApiResponse<T>;
      return {
        error: {
          message: errorData.error || errorData.message || `HTTP ${response.status}`,
          status: response.status,
        },
      };
    }

    const data = (await response.json()) as T;
    return { data };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      return {
        error: {
          message: 'Request timeout',
          status: 408,
        },
      };
    }

    return {
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

export { fetchApi };
