"use client";

import { useEffect, useState } from "react";
import { getEvents, getRegistrations } from "@/lib/api/events";
import type { Event, PaginatedEventsResponse, Registration } from "@/types/events";
import { Alert } from "@/components/ui/Alert";
import { EventsList } from "@/components/events/EventsList";
import { EventsFilters } from "@/components/events/EventsFilters";
import { Pagination } from "@/components/events/Pagination";

type FetchState = {
  data: Event[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const initialState: FetchState = {
  data: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
};

export default function EventsPage() {
  const [state, setState] = useState<FetchState>(initialState);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);

  const loadEvents = async (
    options?: Partial<Pick<FetchState, "page" | "limit">>
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const params = {
        page: options?.page ?? state.page,
        limit: options?.limit ?? state.limit,
        search: search.trim() || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      };

      const response: PaginatedEventsResponse = await getEvents(params);

      setState({
        data: response.data,
        total: response.total,
        page: response.page,
        limit: response.limit,
        totalPages: response.totalPages,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load events";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadEvents({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, dateFrom, dateTo]);

  const handlePageChange = (page: number) => {
    void loadEvents({ page });
  };

  const handleRetry = () => {
    void loadEvents();
  };

  const hasEvents = state.data.length > 0;

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        const data: Registration[] = await getRegistrations();
        const ids = Array.from(new Set(data.map((item) => item.eventId)));
        setRegisteredEventIds(ids);
      } catch {
      }
    };

    void loadRegistrations();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <EventsFilters
        search={search}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onSearchChange={setSearch}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onClear={() => {
          setSearch("");
          setDateFrom("");
          setDateTo("");
        }}
      />

      {isLoading && !hasEvents && !error && (
        <div className="flex w-full justify-center py-10">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-transparent dark:border-neutral-600" />
        </div>
      )}

      {error && (
        <div className="flex flex-col gap-2">
          <Alert variant="error" title="Error" message={error} />
          <button
            type="button"
            onClick={handleRetry}
            className="self-start text-sm text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && !hasEvents && (
        <div className="py-8 text-sm text-neutral-500 dark:text-neutral-400">
          No events found for the selected filters.
        </div>
      )}

      {hasEvents && (
        <div className="flex flex-col gap-4">
          <EventsList
            events={state.data}
            registeredEventIds={registeredEventIds}
          />
          <Pagination
            page={state.page}
            totalPages={state.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

