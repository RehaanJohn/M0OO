'use client';

import { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const cattlePositions = [
  { id: 1, name: 'Bessie', tag: '#247', lat: 37.7749, lng: -122.4194, status: 'alert', herd: 'A' },
  { id: 2, name: 'Duke', tag: '#103', lat: 37.7849, lng: -122.4094, status: 'healthy', herd: 'A' },
  { id: 3, name: 'Daisy', tag: '#156', lat: 37.7649, lng: -122.4294, status: 'warning', herd: 'B' },
  { id: 4, name: 'Charlie', tag: '#089', lat: 37.7549, lng: -122.4394, status: 'healthy', herd: 'B' },
  { id: 5, name: 'Bella', tag: '#201', lat: 37.7949, lng: -122.3994, status: 'healthy', herd: 'A' },
  { id: 6, name: 'Max', tag: '#178', lat: 37.7449, lng: -122.4494, status: 'healthy', herd: 'C' },
  { id: 7, name: 'Luna', tag: '#234', lat: 37.7849, lng: -122.4394, status: 'alert', herd: 'A' },
  { id: 8, name: 'Rocky', tag: '#145', lat: 37.7749, lng: -122.3894, status: 'healthy', herd: 'B' },
];

export default function MapPage() {
  const [selectedCattle, setSelectedCattle] = useState<number | null>(null);
  const [filterHerd, setFilterHerd] = useState<string>('all');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const filteredCattle = filterHerd === 'all' 
    ? cattlePositions 
    : cattlePositions.filter(c => c.herd === filterHerd);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;

      // Only initialize once
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = L.map(mapRef.current!).setView([37.7749, -122.4194], 13);

      // Dark theme tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Add cattle markers
      filteredCattle.forEach((cattle) => {
        const markerColor = 
          cattle.status === 'healthy' ? '#4ade80' :
          cattle.status === 'warning' ? '#facc15' : '#f87171';

        const markerHtml = `
          <div style="
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: ${markerColor};
            border: 3px solid white;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
          "></div>
        `;

        const icon = L.divIcon({
          html: markerHtml,
          className: 'custom-marker',
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const marker = L.marker([cattle.lat, cattle.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="color: black; font-weight: 600;">${cattle.name}</div>
            <div style="color: #666; font-size: 12px;">${cattle.tag} • Herd ${cattle.herd}</div>
            <div style="color: #666; font-size: 12px; margin-top: 4px;">Status: ${cattle.status}</div>
          `);

        marker.on('click', () => {
          setSelectedCattle(cattle.id);
        });
      });
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [filteredCattle]);

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Live Map</h1>
          <p className="text-white/40">View real-time cattle locations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Side Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Herd Filter */}
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <h3 className="font-semibold mb-3">Filter by Herd</h3>
              <div className="space-y-2">
                {['all', 'A', 'B', 'C'].map((herd) => (
                  <button
                    key={herd}
                    onClick={() => setFilterHerd(herd)}
                    className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${
                      filterHerd === herd
                        ? 'bg-purple-600 text-white'
                        : 'bg-zinc-800 text-white/70 hover:bg-zinc-700'
                    }`}
                  >
                    {herd === 'all' ? 'All Herds' : `Herd ${herd}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Cattle List */}
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <h3 className="font-semibold mb-3">Cattle ({filteredCattle.length})</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredCattle.map((cattle) => (
                  <button
                    key={cattle.id}
                    onClick={() => setSelectedCattle(cattle.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all ${
                      selectedCattle === cattle.id
                        ? 'bg-purple-600/30 border border-purple-500'
                        : 'bg-zinc-800 hover:bg-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">{cattle.name}</div>
                        <div className="text-xs text-white/60">{cattle.tag} • Herd {cattle.herd}</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        cattle.status === 'healthy' ? 'bg-green-400' :
                        cattle.status === 'warning' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
              <h3 className="font-semibold mb-3">Status Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-sm text-white/70">Healthy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span className="text-sm text-white/70">Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span className="text-sm text-white/70">Alert</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4">Interactive Map</h2>

              {/* Leaflet Map */}
              <div 
                ref={mapRef} 
                className="h-[600px] bg-black rounded-xl overflow-hidden border border-zinc-800"
                style={{ zIndex: 0 }}
              ></div>

              {/* Map Stats */}
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{filteredCattle.filter(c => c.status === 'healthy').length}</div>
                  <div className="text-xs text-white/40">Healthy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{filteredCattle.filter(c => c.status === 'warning').length}</div>
                  <div className="text-xs text-white/40">Warning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{filteredCattle.filter(c => c.status === 'alert').length}</div>
                  <div className="text-xs text-white/40">Alert</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{filteredCattle.length}</div>
                  <div className="text-xs text-white/40">Total Visible</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
