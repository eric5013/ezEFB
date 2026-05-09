// features/flight-plan/MapView.tsx
import { MapContainer, TileLayer, Polyline, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const MapView = ({ route }) => (
  <MapContainer center={[30, 118]} zoom={5} className="h-full w-full">
    <TileLayer
      url="/tiles/{z}/{x}/{y}.png"
      maxZoom={10}
    />
    <Polyline positions={route.map(w => [w.lat, w.lon])} color="#38bdf8" weight={3} />
    {route.map((w, i) => (
      <CircleMarker
        key={i}
        center={[w.lat, w.lon]}
        radius={6}
        pathOptions={{ color: '#f87171' }}
      />
    ))}
  </MapContainer>
);