import { useState } from "react";
import { Map, Marker } from "pigeon-maps";

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: "active" | "resolved" | "in-progress";
  title: string;
  location: string;
}

const markers: MapMarker[] = [
  { id: "1", lat: 14.6937, lng: -17.4441, type: "active", title: "Décharge sauvage", location: "Dakar Centre" },
  { id: "2", lat: 14.7167, lng: -17.4677, type: "in-progress", title: "Collecte en cours", location: "Yoff" },
  { id: "3", lat: 14.7645, lng: -17.3660, type: "resolved", title: "Résolu", location: "Pikine" },
  { id: "4", lat: 14.6928, lng: -17.4467, type: "active", title: "Débordement", location: "Plateau" },
  { id: "5", lat: 14.7392, lng: -17.4903, type: "in-progress", title: "En traitement", location: "Ngor" },
  { id: "6", lat: 14.7019, lng: -17.4675, type: "resolved", title: "Nettoyé", location: "Parcelles Assainies" },
  { id: "7", lat: 14.6815, lng: -17.4467, type: "active", title: "Déchets plastiques", location: "Médina" },
  { id: "8", lat: 14.7456, lng: -17.3891, type: "in-progress", title: "Intervention", location: "Guédiawaye" },
  { id: "9", lat: 14.7123, lng: -17.4556, type: "resolved", title: "Traité", location: "Grand Yoff" },
  { id: "10", lat: 14.6745, lng: -17.4323, type: "active", title: "Décharge illégale", location: "Fann" },
  { id: "11", lat: 14.7289, lng: -17.4712, type: "in-progress", title: "Collecte en cours", location: "Ouakam" },
  { id: "12", lat: 14.7567, lng: -17.3778, type: "resolved", title: "Résolu", location: "Thiaroye" },
  { id: "13", lat: 14.6889, lng: -17.4589, type: "active", title: "Urgence", location: "Point E" },
  { id: "14", lat: 14.7034, lng: -17.4389, type: "in-progress", title: "Nettoyage", location: "Sicap" },
  { id: "15", lat: 14.6667, lng: -17.4234, type: "resolved", title: "Terminé", location: "Dieuppeul" },
  { id: "16", lat: 14.7345, lng: -17.4823, type: "active", title: "Nouveau", location: "Almadies" },
  { id: "17", lat: 14.7712, lng: -17.3589, type: "in-progress", title: "En cours", location: "Keur Massar" },
  { id: "18", lat: 14.6812, lng: -17.4178, type: "resolved", title: "Complété", location: "Mermoz" },
  { id: "19", lat: 14.7156, lng: -17.4689, type: "active", title: "Signalé", location: "HLM" },
  { id: "20", lat: 14.6956, lng: -17.4512, type: "in-progress", title: "Action", location: "Liberté 6" },
];

const markerColors = {
  active: "#ef4444",
  "in-progress": "#f59e0b",
  resolved: "#1FAF5A",
};

export function MapView({ reports = [] }: { reports?: any[] }) {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  const displayMarkers: MapMarker[] = reports.length > 0 ? reports.map(r => ({
    id: String(r.id),
    lat: Number(r.latitude) || 14.6928,
    lng: Number(r.longitude) || -17.4467,
    type: r.status as any,
    title: r.title,
    location: r.location
  })) : markers;

  return (
    <div className="rounded-xl border border-border overflow-hidden relative h-[380px] bg-card/40 backdrop-blur-xl">
      {/* Location Badge */}
      <div className="absolute top-3 left-3 z-[1000] bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-primary/30">
        <div className="flex items-center gap-1.5 text-white">
          <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-bold text-xs">Dakar, Sénégal</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-3 right-3 z-[1000] bg-black/80 backdrop-blur-md px-2.5 py-2 rounded-lg border border-border space-y-1.5">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
          <span className="text-[10px] text-white/90 font-medium">Actifs (7)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50"></div>
          <span className="text-[10px] text-white/90 font-medium">En cours (7)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
          <span className="text-[10px] text-white/90 font-medium">Résolus (6)</span>
        </div>
      </div>

      {/* Pigeon Map */}
      <Map
        height={380}
        center={[14.6928, -17.4467]}
        zoom={12}
        dprs={[1, 2]}
      >
        {displayMarkers.map((marker) => (
          <Marker
            key={marker.id}
            width={40}
            anchor={[marker.lat, marker.lng]}
            onMouseOver={() => setHoveredMarker(marker.id)}
            onMouseOut={() => setHoveredMarker(null)}
          >
            <div className="relative">
              {/* Marker SVG */}
              <svg
                width="30"
                height="45"
                viewBox="0 0 30 45"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transform: hoveredMarker === marker.id ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.2s',
                  cursor: 'pointer',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}
              >
                <path
                  d="M15 0C9.5 0 5 4.5 5 10c0 7.5 10 20 10 20s10-12.5 10-20c0-5.5-4.5-10-10-10z"
                  fill={markerColors[marker.type]}
                  stroke="white"
                  strokeWidth="2"
                />
                <circle cx="15" cy="10" r="4" fill="white" />
              </svg>

              {/* Tooltip */}
              {hoveredMarker === marker.id && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-black/90 backdrop-blur-md text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap border border-primary/30 shadow-xl pointer-events-none">
                  <div className="font-bold">{marker.location}</div>
                  <div className="text-white/70 text-[10px]">{marker.title}</div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/90"></div>
                </div>
              )}
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}
