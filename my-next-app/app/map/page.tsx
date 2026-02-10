'use client';

import { useState } from 'react';

const cattlePositions = [
  { id: 1, name: 'Bessie', tag: '#247', x: 25, y: 30, status: 'alert', herd: 'A' },
  { id: 2, name: 'Duke', tag: '#103', x: 45, y: 50, status: 'healthy', herd: 'A' },
  { id: 3, name: 'Daisy', tag: '#156', x: 60, y: 40, status: 'warning', herd: 'B' },
  { id: 4, name: 'Charlie', tag: '#089', x: 70, y: 60, status: 'healthy', herd: 'B' },
  { id: 5, name: 'Bella', tag: '#201', x: 35, y: 70, status: 'healthy', herd: 'A' },
  { id: 6, name: 'Max', tag: '#178', x: 80, y: 35, status: 'healthy', herd: 'C' },
  { id: 7, name: 'Luna', tag: '#234', x: 20, y: 55, status: 'alert', herd: 'A' },
  { id: 8, name: 'Rocky', tag: '#145', x: 55, y: 25, status: 'healthy', herd: 'B' },
];

const geofences = [
  { id: 1, name: 'North Pasture', active: true, color: 'border-blue-400' },
  { id: 2, name: 'East Grazing', active: true, color: 'border-green-400' },
  { id: 3, name: 'South Field', active: false, color: 'border-purple-400' },
];

const pointsOfInterest = [
  { id: 1, type: 'water', name: 'Water Tank 1', x: 40, y: 45, icon: '💧' },
  { id: 2, type: 'feed', name: 'Feed Station', x: 65, y: 50, icon: '🌾' },
  { id: 3, type: 'gate', name: 'Main Gate', x: 50, y: 15, icon: '🚪' },
  { id: 4, type: 'hazard', name: 'Steep Hill', x: 85, y: 75, icon: '⚠️' },
];

export default function MapPage() {
  const [showTrails, setShowTrails] = useState(true);
  const [showGeofences, setShowGeofences] = useState(true);
  const [showPOIs, setShowPOIs] = useState(true);
  const [selectedCattle, setSelectedCattle] = useState<number | null>(null);
  const [mapView, setMapView] = useState<'satellite' | 'terrain' | 'hybrid'>('hybrid');
  const [filterHerd, setFilterHerd] = useState<string>('all');

  const filteredCattle = filterHerd === 'all' 
    ? cattlePositions 
    : cattlePositions.filter(c => c.herd === filterHerd);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Live Map</h1>
            <p className="text-white/60">Real-time cattle tracking and geofence management</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition-all flex items-center gap-2">
              <span>🎯</span> Center All
            </button>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Side Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Map Controls */}
            <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 border border-white/20">
              <h3 className="font-semibold mb-3">Map View</h3>
              <div className="space-y-2">
                {(['satellite', 'terrain', 'hybrid'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setMapView(view)}
                    className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${
                      mapView === view
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Layer Controls */}
            <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 border border-white/20">
              <h3 className="font-semibold mb-3">Layers</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTrails}
                    onChange={(e) => setShowTrails(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Movement Trails</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showGeofences}
                    onChange={(e) => setShowGeofences(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Geofences</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPOIs}
                    onChange={(e) => setShowPOIs(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Points of Interest</span>
                </label>
              </div>
            </div>

            {/* Herd Filter */}
            <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 border border-white/20">
              <h3 className="font-semibold mb-3">Filter by Herd</h3>
              <div className="space-y-2">
                {['all', 'A', 'B', 'C'].map((herd) => (
                  <button
                    key={herd}
                    onClick={() => setFilterHerd(herd)}
                    className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${
                      filterHerd === herd
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {herd === 'all' ? 'All Herds' : `Herd ${herd}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Cattle List */}
            <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 border border-white/20">
              <h3 className="font-semibold mb-3">Cattle ({filteredCattle.length})</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredCattle.map((cattle) => (
                  <button
                    key={cattle.id}
                    onClick={() => setSelectedCattle(cattle.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all ${
                      selectedCattle === cattle.id
                        ? 'bg-purple-500/30 border border-purple-400'
                        : 'bg-white/5 hover:bg-white/10'
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
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
              {/* Map Toolbar */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Interactive Map</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all text-sm">
                    📏 Measure
                  </button>
                  <button className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all text-sm">
                    ✏️ Draw
                  </button>
                  <button className="px-3 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-all text-sm font-semibold">
                    🔷 New Geofence
                  </button>
                </div>
              </div>

              {/* Map Display */}
              <div className="relative h-[600px] bg-gradient-to-br from-green-900/30 via-green-800/20 to-emerald-900/30 rounded-xl overflow-hidden border border-white/10">
                {/* Map Background Pattern */}
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}></div>

                {/* Geofences */}
                {showGeofences && (
                  <>
                    <div className="absolute top-[15%] left-[10%] w-[35%] h-[40%] border-4 border-blue-400/40 rounded-xl backdrop-blur-sm bg-blue-500/5">
                      <div className="absolute -top-6 left-2 px-2 py-1 bg-blue-500 rounded text-xs font-semibold">
                        North Pasture
                      </div>
                    </div>
                    <div className="absolute top-[25%] right-[15%] w-[30%] h-[45%] border-4 border-green-400/40 rounded-xl backdrop-blur-sm bg-green-500/5">
                      <div className="absolute -top-6 left-2 px-2 py-1 bg-green-500 rounded text-xs font-semibold">
                        East Grazing
                      </div>
                    </div>
                  </>
                )}

                {/* Points of Interest */}
                {showPOIs && pointsOfInterest.map((poi) => (
                  <div
                    key={poi.id}
                    className="absolute group cursor-pointer"
                    style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                  >
                    <div className="relative">
                      <div className="text-2xl hover:scale-125 transition-transform">
                        {poi.icon}
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {poi.name}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Cattle Markers */}
                {filteredCattle.map((cattle) => (
                  <div
                    key={cattle.id}
                    className="absolute cursor-pointer group"
                    style={{ left: `${cattle.x}%`, top: `${cattle.y}%` }}
                    onClick={() => setSelectedCattle(cattle.id)}
                  >
                    {/* Movement Trail */}
                    {showTrails && (
                      <svg className="absolute w-32 h-32 -left-16 -top-16 opacity-30">
                        <path
                          d={`M 64 64 Q ${Math.random() * 64} ${Math.random() * 64}, ${Math.random() * 128} ${Math.random() * 128}`}
                          stroke={cattle.status === 'healthy' ? '#4ade80' : cattle.status === 'warning' ? '#facc15' : '#f87171'}
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 4"
                        />
                      </svg>
                    )}

                    {/* Marker */}
                    <div className={`relative w-6 h-6 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                      selectedCattle === cattle.id ? 'scale-150' : 'scale-100'
                    } ${
                      cattle.status === 'healthy' ? 'bg-green-400 shadow-lg shadow-green-400/50' :
                      cattle.status === 'warning' ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50 animate-pulse' :
                      'bg-red-400 shadow-lg shadow-red-400/50 animate-pulse'
                    }`}>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>

                    {/* Cattle Info Popup */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-8 transition-all ${
                      selectedCattle === cattle.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                    }`}>
                      <div className="backdrop-blur-xl bg-black/90 rounded-lg p-3 border border-white/20 whitespace-nowrap shadow-xl">
                        <div className="font-semibold text-sm">{cattle.name}</div>
                        <div className="text-xs text-white/60">{cattle.tag} • Herd {cattle.herd}</div>
                        <div className="mt-2 pt-2 border-t border-white/10 space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              cattle.status === 'healthy' ? 'bg-green-400' :
                              cattle.status === 'warning' ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`} />
                            <span>
                              {cattle.status === 'healthy' ? 'Healthy' : cattle.status === 'warning' ? 'Needs Attention' : 'Alert'}
                            </span>
                          </div>
                          <div>📍 Inside North Pasture</div>
                          <div>🔋 Battery: 85%</div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <button className="px-2 py-1 bg-purple-500 hover:bg-purple-600 rounded text-xs transition-all">
                            View Details
                          </button>
                          <button className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs transition-all">
                            Locate
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Zoom Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <button className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-lg border border-white/20 transition-all flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-lg border border-white/20 transition-all flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                </div>

                {/* Fullscreen Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-lg border border-white/20 transition-all flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>

              {/* Map Stats */}
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{filteredCattle.filter(c => c.status === 'healthy').length}</div>
                  <div className="text-xs text-white/60">Healthy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{filteredCattle.filter(c => c.status === 'warning').length}</div>
                  <div className="text-xs text-white/60">Warning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{filteredCattle.filter(c => c.status === 'alert').length}</div>
                  <div className="text-xs text-white/60">Alert</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{filteredCattle.length}</div>
                  <div className="text-xs text-white/60">Total Visible</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
