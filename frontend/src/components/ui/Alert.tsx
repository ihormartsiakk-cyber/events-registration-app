type AlertVariant = 'success' | 'error';

type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  message: string;
};

export function Alert(props: AlertProps) {
  const { variant = 'success', title, message } = props;

  const isSuccess = variant === 'success';

  const containerClasses = isSuccess
    ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-500/60 dark:bg-emerald-950 dark:text-emerald-100'
    : 'border-red-300 bg-red-50 text-red-900 dark:border-red-500/60 dark:bg-red-950 dark:text-red-100';

  return (
    <div
      className={`flex flex-col gap-1 rounded-md border px-3 py-2 text-sm ${containerClasses}`}
    >
      {title && <div className="font-medium">{title}</div>}
      <div>{message}</div>
    </div>
  );
}

