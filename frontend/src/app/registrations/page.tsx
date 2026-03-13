"use client";
import { useEffect, useState } from "react";
import { getRegistrations } from "@/lib/api/events";
import type { Registration } from "@/types/events";
import { Alert } from "@/components/ui/Alert";

export default function RegistrationsPage() {
  const [items, setItems] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getRegistrations();
      setItems(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Registrations
      </h1>

      {isLoading && !error && (
        <div className="flex w-full justify-center py-10">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-transparent dark:border-neutral-600" />
        </div>
      )}

      {error && (
        <div className="flex flex-col gap-2">
          <Alert variant="error" title="error" message={error} />
          <button
            type="button"
            onClick={load}
            className="self-start text-sm text-neutral-900 underline underline-offset-4 dark:text-neutral-100"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && items.length === 0 && (
        <div className="py-8 text-sm text-neutral-500 dark:text-neutral-400">
          No registrations yet.
        </div>
      )}

      {!isLoading && !error && items.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <table className="min-w-full text-left text-xs text-neutral-700 dark:text-neutral-200">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-400">
              <tr>
                <th className="px-3 py-2">Event</th>
                <th className="px-3 py-2">Full name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Phone</th>
                <th className="px-3 py-2">Created at</th>
              </tr>
            </thead>
            <tbody>
              {items.map((registration) => (
                <tr
                  key={registration.id}
                  className="border-b border-neutral-200 last:border-0 dark:border-neutral-800"
                >
                  <td className="px-3 py-2 align-top text-neutral-600 dark:text-neutral-300">
                    {registration.eventTitle}
                  </td>
                  <td className="px-3 py-2 align-top">{registration.fullName}</td>
                  <td className="px-3 py-2 align-top">{registration.email}</td>
                  <td className="px-3 py-2 align-top">{registration.phone}</td>
                  <td className="px-3 py-2 align-top text-neutral-500 dark:text-neutral-400">
                    {new Date(registration.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

