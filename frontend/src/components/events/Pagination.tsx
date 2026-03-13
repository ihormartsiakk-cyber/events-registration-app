type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination(props: PaginationProps) {
  const { page, totalPages, onPageChange } = props;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const handlePrev = () => {
    if (canGoPrev) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-neutral-200 pt-3 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
      <div>
        Page {page} of {totalPages}
      </div>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="rounded-md border border-neutral-300 px-2 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canGoNext}
          className="rounded-md border border-neutral-300 px-2 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}

