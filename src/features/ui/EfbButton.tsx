export const EfbButton = ({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={`min-h-[48px] px-4 py-3 rounded-xl text-base font-bold active:scale-95 transition-transform bg-sky-700 text-white ${className}`}
  >
    {children}
  </button>
);