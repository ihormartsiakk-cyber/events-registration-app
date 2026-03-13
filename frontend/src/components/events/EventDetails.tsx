import type { Event } from "@/types/events";
import { Button } from "@/components/ui/Button";

type EventDetailsProps = {
  event: Event;
  onRegisterClick?: () => void;
};

export function EventDetails(props: EventDetailsProps) {
  const { event, onRegisterClick } = props;
  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });


  return (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {event.title}
          </h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            {event.shortDescription}
          </p>
        </div>
      </div>
      <div className="text-sm text-neutral-600 dark:text-neutral-300">
        <div>
          <span className="font-medium">Date:</span> {formattedDate}
        </div>
        <div>
          <span className="font-medium">Location:</span> {event.location}
        </div>
      </div>
      <div className="border-t border-neutral-200 pt-3 text-sm text-neutral-700 dark:border-neutral-800 dark:text-neutral-200">
        {event.description}
      </div>
      <div className="pt-1">
        <Button onClick={onRegisterClick}>Register</Button>
      </div>
    </div>
  );
}

