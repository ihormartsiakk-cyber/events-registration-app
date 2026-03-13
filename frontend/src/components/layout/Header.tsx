"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const isEventsActive = pathname === "/" || pathname.startsWith("/events");
  const isRegistrationsActive = pathname.startsWith("/registrations");

  return (
    <header className="border-b bg-white/70 backdrop-blur dark:bg-neutral-900/70">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <div className="text-lg font-semibold tracking-tight">Events</div>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className={`hover:text-neutral-900 dark:hover:text-neutral-50 ${
              isEventsActive
                ? "text-neutral-900 dark:text-neutral-50"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            Events
          </Link>
          <Link
            href="/registrations"
            className={`hover:text-neutral-900 dark:hover:text-neutral-50 ${
              isRegistrationsActive
                ? "text-neutral-900 dark:text-neutral-50"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            Registrations
          </Link>
          <a
            href="http://localhost:3001/api"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
          >
            API docs
          </a>
        </nav>
      </div>
    </header>
  );
}

