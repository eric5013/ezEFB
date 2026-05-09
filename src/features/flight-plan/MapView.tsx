import { MapContainer, TileLayer, Polyline, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngExpression } from 'leaflet';
import { Waypoint } from '@/app/types';

interface MapViewProps {
  waypoints: Waypoint[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const MapView = ({
  waypoints,
  selectedIndex,
  onSelect,
}: MapViewProps) => {
  const center: LatLngExpression = [30, 118];

  return (
    <MapContainer
      center={center}
      zoom={5}
      className="h-full w-full"
    >
      <TileLayer url="/tiles/{z}/{x}/{y}.png" />

      <Polyline
        positions={waypoints.map(
          (w): LatLngExpression => [w.lat, w.lon]
        )}
        color="#38bdf8"
        weight={3}
      />

      {waypoints.map((w, i: number) => (
        <CircleMarker
          key={w.id}
          center={[w.lat, w.lon]}
          radius={i === selectedIndex ? 10 : 6}
          pathOptions={{
            color: i === selectedIndex ? '#f87171' : '#22d3ee',
            fillOpacity: 0.8,
          }}
          eventHandlers={{
            click: () => onSelect(i),
          }}
        />
      ))}
    </MapContainer>
  );
};