'use client';

import { useState } from 'react';

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

  const filteredGeofences = filterStatus === 'all'
    ? geofences
    : geofences.filter(g => g.status === filterStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Geofence Management</h1>
            <p className="text-white/60">Create and manage virtual boundaries for your cattle</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg"
          >
            <span>➕</span> Create Geofence
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-5 border border-white/20">
            <div className="text-3xl font-bold">{geofences.length}</div>
            <div className="text-sm text-white/60">Total Geofences</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-5 border border-white/20">
            <div className="text-3xl font-bold text-green-400">{geofences.filter(g => g.status === 'active').length}</div>
            <div className="text-sm text-white/60">Active</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-5 border border-white/20">
            <div className="text-3xl font-bold text-blue-400">{geofences.reduce((sum, g) => sum + g.cattleCount, 0)}</div>
            <div className="text-sm text-white/60">Total Cattle Assigned</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 rounded-xl p-5 border border-white/20">
            <div className="text-3xl font-bold text-yellow-400">{geofences.reduce((sum, g) => sum + g.alertsToday, 0)}</div>
            <div className="text-sm text-white/60">Alerts Today</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-4 border border-white/20 mb-6">
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-purple-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Geofence List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold mb-4">Geofences ({filteredGeofences.length})</h2>
            
            {filteredGeofences.map((geofence) => (
              <div
                key={geofence.id}
                className={`backdrop-blur-xl bg-white/10 rounded-xl p-6 border transition-all cursor-pointer ${
                  selectedGeofence === geofence.id
                    ? 'border-purple-400 bg-purple-500/20'
                    : 'border-white/20 hover:bg-white/15'
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
                      <p className="text-sm text-white/60 mb-3">{geofence.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <div className="text-white/50 text-xs">Size</div>
                          <div className="font-semibold">{geofence.size}</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-xs">Cattle</div>
                          <div className="font-semibold">{geofence.cattleCount}</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-xs">Schedule</div>
                          <div className="font-semibold text-xs">{geofence.schedule}</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-xs">Alerts Today</div>
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
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-white/50 text-xs mb-1">Vibration Intensity</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
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
                        <div className="text-white/50 text-xs mb-1">Pattern</div>
                        <div className="text-sm">Pulse (2s interval)</div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-semibold transition-all">
                        Edit Settings
                      </button>
                      <button className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-semibold transition-all">
                        View on Map
                      </button>
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm border border-white/20 transition-all">
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

          {/* Templates Sidebar */}
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold mb-4">Quick Templates</h3>
              <div className="space-y-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-3xl">{template.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold group-hover:text-purple-300 transition-colors">{template.name}</div>
                      </div>
                    </div>
                    <p className="text-xs text-white/60">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold mb-4">Drawing Tools</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition-all flex items-center gap-2">
                  <span>✏️</span> Draw Polygon
                </button>
                <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all flex items-center gap-2">
                  <span>📏</span> Measure Distance
                </button>
                <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all flex items-center gap-2">
                  <span>📐</span> Calculate Area
                </button>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold mb-3">Automation</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🔄</span>
                    <span className="font-semibold">Seasonal Rotation</span>
                  </div>
                  <p className="text-xs text-white/60">Auto-switch pastures based on season</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span>🌦️</span>
                    <span className="font-semibold">Weather Integration</span>
                  </div>
                  <p className="text-xs text-white/60">Adjust boundaries during storms</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span>⏰</span>
                    <span className="font-semibold">Time-Based</span>
                  </div>
                  <p className="text-xs text-white/60">Schedule automatic activation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Geofence Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-slate-900/95 rounded-2xl p-8 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Create New Geofence</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Geofence Name</label>
                <input
                  type="text"
                  placeholder="e.g., North Pasture"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  placeholder="Optional description..."
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Vibration Intensity</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Gentle</option>
                    <option>Medium</option>
                    <option>Strong</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pattern Type</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Pulse</option>
                    <option>Continuous</option>
                    <option>Escalating</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Assign Cattle/Herds</label>
                <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>All Cattle</option>
                  <option>Herd A</option>
                  <option>Herd B</option>
                  <option>Herd C</option>
                  <option>Custom Selection...</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Alert Settings</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Notify when cattle approaches boundary (50m)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Notify when cattle crosses boundary</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Send SMS alerts</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-semibold transition-all"
                >
                  Create & Draw on Map
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
