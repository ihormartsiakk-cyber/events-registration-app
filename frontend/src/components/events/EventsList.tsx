import Link from "next/link";
import type { Event } from "@/types/events";

type EventsListProps = {
  events: Event[];
  registeredEventIds?: string[];
};

export function EventsList(props: EventsListProps) {
  const { events, registeredEventIds } = props;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {events.map((event) => {
        const isRegistered = registeredEventIds?.includes(event.id) ?? false;

        return (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="group flex w-full flex-col rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600 cursor-pointer"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <h2 className="text-sm font-semibold text-neutral-900 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-200">
                {event.title}
              </h2>
              {isRegistered && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                  Registered
                </span>
              )}
            </div>
            <div className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span>
                {new Date(event.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="mx-2">•</span>
              <span>{event.location}</span>
            </div>
            <p className="line-clamp-3 text-xs text-neutral-600 dark:text-neutral-300">
              {event.shortDescription}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

