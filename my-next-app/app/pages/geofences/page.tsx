'use client';

import { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const geofences = [
  {
    id: 1,
    name: 'North Pasture',
    description: 'Primary grazing area for Herd A',
    size: '45 acres',
    cattleCount: 35,
    status: 'active',
    schedule: '24/7',
    vibrationIntensity: 'Medium',
    alertsToday: 3,
    color: 'blue'
  },
  {
    id: 2,
    name: 'East Grazing',
    description: 'Summer rotation zone',
    size: '38 acres',
    cattleCount: 28,
    status: 'active',
    schedule: '6 AM - 8 PM',
    vibrationIntensity: 'Gentle',
    alertsToday: 0,
    color: 'green'
  },
  {
    id: 3,
    name: 'South Field',
    description: 'Winter pasture area',
    size: '52 acres',
    cattleCount: 0,
    status: 'inactive',
    schedule: 'Seasonal',
    vibrationIntensity: 'Strong',
    alertsToday: 0,
    color: 'purple'
  },
  {
    id: 4,
    name: 'West Valley',
    description: 'Reserve grazing zone',
    size: '60 acres',
    cattleCount: 42,
    status: 'active',
    schedule: '24/7',
    vibrationIntensity: 'Medium',
    alertsToday: 5,
    color: 'orange'
  },
  {
    id: 5,
    name: 'Creek Area',
    description: 'Water access zone',
    size: '15 acres',
    cattleCount: 45,
    status: 'active',
    schedule: '24/7',
    vibrationIntensity: 'Gentle',
    alertsToday: 1,
    color: 'cyan'
  },
];

const templates = [
  { id: 1, name: 'Rectangle', icon: '▭', description: 'Simple rectangular boundary' },
  { id: 2, name: 'Circle', icon: '○', description: 'Circular grazing area' },
  { id: 3, name: 'Polygon', icon: '⬡', description: 'Custom multi-point shape' },
  { id: 4, name: 'Summer Rotation', icon: '🔄', description: 'Pre-configured seasonal template' },
];

export default function GeofencesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGeofence, setSelectedGeofence] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [drawingMode, setDrawingMode] = useState<'rectangle' | 'circle' | 'polygon' | null>(null);
  const [excludeRoads, setExcludeRoads] = useState(false);
  const [geofenceName, setGeofenceName] = useState('');
  const [geofenceDescription, setGeofenceDescription] = useState('');
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const drawnItemsRef = useRef<any>(null);

  const filteredGeofences = filterStatus === 'all'
    ? geofences
    : geofences.filter(g => g.status === filterStatus);

  // Initialize map when modal opens
  useEffect(() => {
    if (!showCreateModal || typeof window === 'undefined' || !mapRef.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      const leafletDraw = await import('leaflet-draw');

      // Clean up existing map
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Create map
      const map = L.map(mapRef.current!).setView([37.7749, -122.4194], 13);

      // Dark theme tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Initialize FeatureGroup to store drawn items
      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
      drawnItemsRef.current = drawnItems;

      // Add drawing controls
      const drawControl = new L.Control.Draw({
        position: 'topright',
        draw: {
          polyline: false,
          marker: false,
          circlemarker: false,
          rectangle: {
            shapeOptions: {
              color: '#6b7280',
              weight: 3,
              fillOpacity: 0.2
            }
          },
          circle: {
            shapeOptions: {
              color: '#6b7280',
              weight: 3,
              fillOpacity: 0.2
            }
          },
          polygon: {
            shapeOptions: {
              color: '#6b7280',
              weight: 3,
              fillOpacity: 0.2
            }
          }
        },
        edit: {
          featureGroup: drawnItems,
          remove: true
        }
      });

      map.addControl(drawControl);

      // Handle drawn shapes
      map.on(L.Draw.Event.CREATED, (e: any) => {
        const layer = e.layer;
        drawnItems.addLayer(layer);
        
        // Calculate area
        let area = 0;
        if (e.layerType === 'rectangle' || e.layerType === 'polygon') {
          area = (L.GeometryUtil as any).geodesicArea(layer.getLatLngs()[0]);
        } else if (e.layerType === 'circle') {
          area = Math.PI * Math.pow(layer.getRadius(), 2);
        }
        
        console.log('Geofence drawn:', {
          type: e.layerType,
          area: (area / 4046.86).toFixed(2) + ' acres',
          bounds: layer.getBounds?.(),
          center: layer.getLatLng?.()
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
  }, [showCreateModal]);

  const handleExcludeRoads = async () => {
    if (!mapInstanceRef.current || !excludeRoads) return;
    
    const L = (await import('leaflet')).default;
    
    // Add OSM roads overlay with transparency to visualize excluded areas
    const roadsLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      opacity: 0.3,
      className: 'roads-overlay'
    }).addTo(mapInstanceRef.current);
    
    // You would integrate with Overpass API here to fetch actual road data
    // and exclude them from the geofence area
    console.log('Roads exclusion activated');
  };

  useEffect(() => {
    handleExcludeRoads();
  }, [excludeRoads]);

  const startDrawing = (mode: 'rectangle' | 'circle' | 'polygon') => {
    setDrawingMode(mode);
    // Drawing mode is handled by leaflet-draw controls
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Geofence Management</h1>
            <p className="text-white/40">Create and manage virtual boundaries for your cattle</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-pink-600 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg"
          >
            <span>➕</span> Create Geofence
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
            <div className="text-3xl font-bold">{geofences.length}</div>
            <div className="text-sm text-white/40">Total Geofences</div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
            <div className="text-3xl font-bold text-green-400">{geofences.filter(g => g.status === 'active').length}</div>
            <div className="text-sm text-white/40">Active</div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
            <div className="text-3xl font-bold text-blue-400">{geofences.reduce((sum, g) => sum + g.cattleCount, 0)}</div>
            <div className="text-sm text-white/40">Total Cattle Assigned</div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
            <div className="text-3xl font-bold text-yellow-400">{geofences.reduce((sum, g) => sum + g.alertsToday, 0)}</div>
            <div className="text-sm text-white/40">Alerts Today</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-gray-600 text-white'
                    : 'text-white/70 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Geofence List */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Geofences ({filteredGeofences.length})</h2>
            
            {filteredGeofences.map((geofence) => (
              <div
                key={geofence.id}
                className={`bg-zinc-900 rounded-xl p-6 border transition-all cursor-pointer ${
                  selectedGeofence === geofence.id
                    ? 'border-gray-500 bg-gray-600/20'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
                onClick={() => setSelectedGeofence(geofence.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${geofence.color}-400 to-${geofence.color}-600 flex items-center justify-center text-2xl`}>
                      🔷
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{geofence.name}</h3>
                      <p className="text-sm text-white/40 mb-3">{geofence.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <div className="text-white/40 text-xs">Size</div>
                          <div className="font-semibold">{geofence.size}</div>
                        </div>
                        <div>
                          <div className="text-white/40 text-xs">Cattle</div>
                          <div className="font-semibold">{geofence.cattleCount}</div>
                        </div>
                        <div>
                          <div className="text-white/40 text-xs">Schedule</div>
                          <div className="font-semibold text-xs">{geofence.schedule}</div>
                        </div>
                        <div>
                          <div className="text-white/40 text-xs">Alerts Today</div>
                          <div className={`font-semibold ${geofence.alertsToday > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {geofence.alertsToday}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      geofence.status === 'active'
                        ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-400/30'
                    }`}>
                      {geofence.status}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedGeofence === geofence.id && (
                  <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-white/40 text-xs mb-1">Vibration Intensity</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                geofence.vibrationIntensity === 'Gentle' ? 'bg-green-400 w-1/3' :
                                geofence.vibrationIntensity === 'Medium' ? 'bg-yellow-400 w-2/3' :
                                'bg-red-400 w-full'
                              }`}
                            ></div>
                          </div>
                          <span className="text-xs">{geofence.vibrationIntensity}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-white/40 text-xs mb-1">Pattern</div>
                        <div className="text-sm">Pulse (2s interval)</div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm font-semibold transition-all">
                        Edit Settings
                      </button>
                      <button className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm font-semibold transition-all">
                        View on Map
                      </button>
                      <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm border border-zinc-800 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Geofence Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 max-w-7xl w-full h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h2 className="text-2xl font-bold">Create New Geofence</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Left Sidebar - Settings */}
              <div className="w-80 p-6 border-r border-zinc-800 overflow-y-auto">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Geofence Name</label>
                    <input
                      type="text"
                      value={geofenceName}
                      onChange={(e) => setGeofenceName(e.target.value)}
                      placeholder="e.g., North Pasture"
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={geofenceDescription}
                      onChange={(e) => setGeofenceDescription(e.target.value)}
                      placeholder="Optional description..."
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none text-white"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Drawing Tools</label>
                    <div className="space-y-2">
                      <div className="text-xs text-white/40 mb-2">Use the drawing tools on the map to create your geofence boundary</div>
                      <div className="grid grid-cols-3 gap-2">
                        <button 
                          className="p-3 bg-zinc-800 hover:bg-gray-600 rounded-lg border border-zinc-700 transition-all flex flex-col items-center gap-1"
                          title="Draw Rectangle"
                        >
                          <span className="text-xl">▭</span>
                          <span className="text-xs">Rectangle</span>
                        </button>
                        <button 
                          className="p-3 bg-zinc-800 hover:bg-gray-600 rounded-lg border border-zinc-700 transition-all flex flex-col items-center gap-1"
                          title="Draw Circle"
                        >
                          <span className="text-xl">○</span>
                          <span className="text-xs">Circle</span>
                        </button>
                        <button 
                          className="p-3 bg-zinc-800 hover:bg-gray-600 rounded-lg border border-zinc-700 transition-all flex flex-col items-center gap-1"
                          title="Draw Polygon"
                        >
                          <span className="text-xl">⬡</span>
                          <span className="text-xs">Polygon</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 p-3 bg-zinc-800 rounded-lg border border-zinc-700 cursor-pointer hover:bg-zinc-700 transition-all">
                      <input 
                        type="checkbox" 
                        checked={excludeRoads}
                        onChange={(e) => setExcludeRoads(e.target.checked)}
                        className="rounded" 
                      />
                      <div>
                        <div className="text-sm font-medium">Exclude Major Roads</div>
                        <div className="text-xs text-white/40">Automatically exclude roads from geofence</div>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Vibration Intensity</label>
                    <select className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-white">
                      <option>Gentle</option>
                      <option>Medium</option>
                      <option>Strong</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Assign Cattle/Herds</label>
                    <select className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 text-white">
                      <option>All Cattle</option>
                      <option>Herd A</option>
                      <option>Herd B</option>
                      <option>Herd C</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="flex-1 relative">
                <div 
                  ref={mapRef} 
                  className="w-full h-full bg-black"
                  style={{ zIndex: 0 }}
                ></div>
                
                {/* Map Instructions Overlay */}
                <div className="absolute top-4 left-4 bg-zinc-900/95 border border-zinc-800 rounded-lg p-4 max-w-xs">
                  <h4 className="font-semibold mb-2 text-sm">How to Draw</h4>
                  <ul className="text-xs text-white/60 space-y-1">
                    <li>• Use the drawing tools on the right side of the map</li>
                    <li>• Click to start drawing, click again to add points</li>
                    <li>• Double-click to finish drawing</li>
                    <li>• Use edit tools to modify or delete shapes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-800 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Creating geofence:', { name: geofenceName, description: geofenceDescription, excludeRoads });
                  setShowCreateModal(false);
                }}
                className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-all"
              >
                Create Geofence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
