import { TouchWaypointItem } from './TouchWaypointItem';
import { Waypoint } from '@/app/types';

export const WaypointList = ({
  waypoints,
  selectedIndex,
  onSelect,
}: {
  waypoints: Waypoint[];
  selectedIndex: number;
  onSelect: (i: number) => void;
}) => (
  <div className="flex-1 overflow-y-auto">
    {waypoints.map((wp, i) => (
      <TouchWaypointItem
        key={wp.id}
        waypoint={wp}
        selected={i === selectedIndex}
        onPress={() => onSelect(i)}
      />
    ))}
  </div>
);