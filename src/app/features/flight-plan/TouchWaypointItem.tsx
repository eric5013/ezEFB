// features/flight-plan/TouchWaypointItem.tsx
export const TouchWaypointItem = ({ wp, selected, onPress }) => (
  <div
    onPointerDown={onPress}
    className={`
      px-5 py-4
      border-b border-neutral-700
      min-h-[56px]
      active:scale-[0.98]
      ${selected ? 'bg-sky-900/40' : 'hover:bg-neutral-800'}
    `}
  >
    <div className="font-bold text-lg">{wp.id}</div>
    <div className="text-sm text-neutral-400">{wp.type}</div>
  </div>
);