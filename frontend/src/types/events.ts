export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  shortDescription: string;
  description: string;
};

export type PaginatedEventsResponse = {
  data: Event[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type GetEventsParams = {
  page?: number;
  limit?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type RegistrationPayload = {
  fullName: string;
  email: string;
  phone: string;
};

export type Registration = {
  id: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
};

