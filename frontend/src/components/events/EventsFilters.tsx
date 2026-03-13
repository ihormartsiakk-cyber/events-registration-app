import { Input } from "@/components/ui/Input";

type EventsFiltersProps = {
  search: string;
  dateFrom: string;
  dateTo: string;
  onSearchChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onClear?: () => void;
};

export function EventsFilters(props: EventsFiltersProps) {
  const {
    search,
    dateFrom,
    dateTo,
    onSearchChange,
    onDateFromChange,
    onDateToChange,
    onClear,
  } = props;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="grid gap-3 md:grid-cols-[2fr,1fr,1fr]">
        <Input
          name="search"
          label="Search by title"
          placeholder="Search events..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <Input
          name="dateFrom"
          label="From date"
          type="date"
          value={dateFrom}
          onChange={(event) => onDateFromChange(event.target.value)}
        />
        <Input
          name="dateTo"
          label="To date"
          type="date"
          value={dateTo}
          onChange={(event) => onDateToChange(event.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClear}
          disabled={!search && !dateFrom && !dateTo}
          className="rounded-md border border-neutral-300 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-800"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}

