// features/ui/EfbButton.tsx
export const EfbButton = ({ children, danger, ...props }) => (
  <button
    {...props}
    className={`
      min-h-[48px] min-w-[48px]
      px-4 py-3
      rounded-xl
      text-base font-bold
      active:scale-95
      transition-transform
      ${danger ? 'bg-red-600' : 'bg-sky-700'}
      text-white
    `}
  >
    {children}
  </button>
);