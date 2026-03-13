import type {
  Event,
  GetEventsParams,
  PaginatedEventsResponse,
  Registration,
  RegistrationPayload,
} from '@/types/events';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001';

type ApiErrorResponse = {
  statusCode?: number;
  message?: string | string[];
  error?: string;
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json() as Promise<T>;
  }

  let errorMessage = 'Request failed';

  try {
    const data = (await response.json()) as ApiErrorResponse;
    if (Array.isArray(data.message)) {
      errorMessage = data.message.join(', ');
    } else if (typeof data.message === 'string') {
      errorMessage = data.message;
    } else if (data.error) {
      errorMessage = data.error;
    }
  } catch {
    errorMessage = response.statusText || errorMessage;
  }

  throw new Error(errorMessage);
}

export async function getEvents(
  params: GetEventsParams = {},
): Promise<PaginatedEventsResponse> {
  const searchParams = new URLSearchParams();

  if (typeof params.page === 'number') {
    searchParams.set('page', String(params.page));
  }

  if (typeof params.limit === 'number') {
    searchParams.set('limit', String(params.limit));
  }

  if (params.search) {
    searchParams.set('search', params.search);
  }

  if (params.dateFrom) {
    searchParams.set('dateFrom', params.dateFrom);
  }

  if (params.dateTo) {
    searchParams.set('dateTo', params.dateTo);
  }

  const query = searchParams.toString();
  const url = `${API_BASE_URL}/events${query ? `?${query}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
  });

  return handleResponse<PaginatedEventsResponse>(response);
}

export async function getEventById(id: string): Promise<Event> {
  const url = `${API_BASE_URL}/events/${encodeURIComponent(id)}`;

  const response = await fetch(url, {
    method: 'GET',
  });

  return handleResponse<Event>(response);
}

export async function registerForEvent(
  id: string,
  payload: RegistrationPayload,
): Promise<{ success: boolean; message: string }> {
  const url = `${API_BASE_URL}/events/${encodeURIComponent(id)}/register`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<{ success: boolean; message: string }>(response);
}

export async function getRegistrations(): Promise<Registration[]> {
  const url = `${API_BASE_URL}/registrations`;

  const response = await fetch(url, {
    method: 'GET',
  });

  return handleResponse<Registration[]>(response);
}

