import { MapContainer, TileLayer, Polyline, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Waypoint } from '@/app/types';

export const MapView = ({
  waypoints,
  selectedIndex,
  onSelect,
}: {
  waypoints: Waypoint[];
  selectedIndex: number;
  onSelect: (i: number) => void;
}) => (
  <MapContainer center={[30, 118]} zoom={5} className="h-full w-full">
    <TileLayer url="/tiles/{z}/{x}/{y}.png" />
    <Polyline
      positions={waypoints.map((w) => [w.lat, w.lon])}
      color="#38bdf8"
      weight={3}
    />
    {waypoints.map((w, i) => (
      <CircleMarker
        key={i}
        center={[w.lat, w.lon]}
        radius={i === selectedIndex ? 10 : 6}
        pathOptions={{
          color: i === selectedIndex ? '#f87171' : '#22d3ee',
          fillOpacity: 0.8,
        }}
        eventHandlers={{ click: () => onSelect(i) }}
      />
    ))}
  </MapContainer>
);