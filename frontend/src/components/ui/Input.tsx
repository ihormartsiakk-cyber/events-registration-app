import type { InputHTMLAttributes } from 'react';

type InputProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  const { label, error, id, className, ...rest } = props;

  const inputId = id ?? rest.name ?? undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-neutral-800 dark:text-neutral-200"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`h-9 rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 shadow-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100 dark:focus:ring-neutral-100 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
        } ${className ?? ''}`}
        {...rest}
      />
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

