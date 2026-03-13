import Link from "next/link";

export default function EventNotFoundPage() {
  return (
    <div className="flex flex-col gap-3 py-12">
      <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Event not found
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        The event does not exist
      </p>
      <Link
        href="/events"
        className="text-sm text-neutral-900 underline underline-offset-4 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300"
      >
        Back to events
      </Link>
    </div>
  );
}

