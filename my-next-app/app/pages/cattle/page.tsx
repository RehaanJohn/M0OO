'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const cattleData = [
  { id: 1, name: 'Bessie', tag: '#247', collar: 'C-089', breed: 'Holstein', age: 3, gender: 'Female', herd: 'A', location: 'North Pasture', status: 'alert', health: 'Needs Attention', battery: 45, activity: 'Low', lastUpdate: '5 min ago' },
  { id: 2, name: 'Duke', tag: '#103', collar: 'C-052', breed: 'Angus', age: 5, gender: 'Male', herd: 'A', location: 'North Pasture', status: 'healthy', health: 'Good', battery: 85, activity: 'Normal', lastUpdate: '2 min ago' },
  { id: 3, name: 'Daisy', tag: '#156', collar: 'C-098', breed: 'Jersey', age: 2, gender: 'Female', herd: 'B', location: 'East Grazing', status: 'warning', health: 'Monitor', battery: 62, activity: 'Low', lastUpdate: '8 min ago' },
  { id: 4, name: 'Charlie', tag: '#089', collar: 'C-034', breed: 'Hereford', age: 4, gender: 'Male', herd: 'B', location: 'East Grazing', status: 'healthy', health: 'Good', battery: 78, activity: 'High', lastUpdate: '1 min ago' },
  { id: 5, name: 'Bella', tag: '#201', collar: 'C-067', breed: 'Holstein', age: 3, gender: 'Female', herd: 'A', location: 'North Pasture', status: 'healthy', health: 'Excellent', battery: 91, activity: 'Normal', lastUpdate: '3 min ago' },
  { id: 6, name: 'Max', tag: '#178', collar: 'C-045', breed: 'Angus', age: 6, gender: 'Male', herd: 'C', location: 'South Field', status: 'healthy', health: 'Good', battery: 88, activity: 'Normal', lastUpdate: '4 min ago' },
  { id: 7, name: 'Luna', tag: '#234', collar: 'C-091', breed: 'Jersey', age: 2, gender: 'Female', herd: 'A', location: 'Outside Boundary', status: 'alert', health: 'Good', battery: 34, activity: 'Normal', lastUpdate: '1 min ago' },
  { id: 8, name: 'Rocky', tag: '#145', collar: 'C-078', breed: 'Hereford', age: 5, gender: 'Male', herd: 'B', location: 'East Grazing', status: 'healthy', health: 'Good', battery: 72, activity: 'High', lastUpdate: '6 min ago' },
];

export default function CattlePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [filterHerd, setFilterHerd] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCattle, setSelectedCattle] = useState<number[]>([]);

  const filteredData = cattleData.filter(cattle => {
    const matchesHerd = filterHerd === 'all' || cattle.herd === filterHerd;
    const matchesStatus = filterStatus === 'all' || cattle.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      cattle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cattle.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesHerd && matchesStatus && matchesSearch;
  });

  const toggleSelectCattle = (id: number) => {
    setSelectedCattle(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedCattle.length === filteredData.length) {
      setSelectedCattle([]);
    } else {
      setSelectedCattle(filteredData.map(c => c.id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Cattle Management</h1>
          <p className="text-white/40">Monitor and manage your entire herd</p>
        </div>

        {/* Controls Bar */}
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 text-white placeholder-white/40"
                />
                <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              <select
                value={filterHerd}
                onChange={(e) => setFilterHerd(e.target.value)}
                className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="all">All Herds</option>
                <option value="A">Herd A</option>
                <option value="B">Herd B</option>
                <option value="C">Herd C</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="all">All Status</option>
                <option value="healthy">Healthy</option>
                <option value="warning">Warning</option>
                <option value="alert">Alert</option>
              </select>

              <div className="flex gap-1 bg-zinc-800 rounded-lg p-1 border border-zinc-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded ${viewMode === 'grid' ? 'bg-gray-600' : 'hover:bg-zinc-700'} transition-all`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded ${viewMode === 'table' ? 'bg-gray-600' : 'hover:bg-zinc-700'} transition-all`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedCattle.length > 0 && (
            <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-3">
              <span className="text-sm text-white/40">{selectedCattle.length} selected</span>
              <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm transition-all font-medium">
                Move to Herd
              </button>
              <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm transition-all font-medium">
                Assign Geofence
              </button>
              <button className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm transition-all border border-zinc-700 font-medium">
                Export Data
              </button>
              <button 
                onClick={() => setSelectedCattle([])}
                className="px-3 py-1 text-sm text-white/40 hover:text-white transition-all"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <div className="text-2xl font-bold">{cattleData.length}</div>
            <div className="text-sm text-white/40">Total Cattle</div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <div className="text-2xl font-bold text-green-400">{cattleData.filter(c => c.status === 'healthy').length}</div>
            <div className="text-sm text-white/40">Healthy</div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <div className="text-2xl font-bold text-yellow-400">{cattleData.filter(c => c.status === 'warning').length}</div>
            <div className="text-sm text-white/40">Warnings</div>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
            <div className="text-2xl font-bold text-red-400">{cattleData.filter(c => c.status === 'alert').length}</div>
            <div className="text-sm text-white/40">Alerts</div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredData.map((cattle) => (
              <div
                key={cattle.id}
                className={`bg-zinc-900 rounded-xl p-4 border transition-all cursor-pointer ${
                  selectedCattle.includes(cattle.id)
                    ? 'border-gray-500 bg-gray-500/10 ring-1 ring-gray-500/50'
                    : 'border-zinc-800 hover:border-zinc-700'
                }`}
                onClick={() => toggleSelectCattle(cattle.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-2xl">
                      🐄
                    </div>
                    <div>
                      <div className="font-semibold">{cattle.name}</div>
                      <div className="text-xs text-white/40">{cattle.tag}</div>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    cattle.status === 'healthy' ? 'bg-green-400' :
                    cattle.status === 'warning' ? 'bg-yellow-400 animate-pulse' :
                    'bg-red-400 animate-pulse'
                  }`}></div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">Breed:</span>
                    <span>{cattle.breed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Age:</span>
                    <span>{cattle.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Herd:</span>
                    <span>Herd {cattle.herd}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Location:</span>
                    <span className="text-xs">{cattle.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Battery:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            cattle.battery > 60 ? 'bg-green-400' :
                            cattle.battery > 30 ? 'bg-yellow-400' :
                            'bg-red-400'
                          }`}
                          style={{ width: `${cattle.battery}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{cattle.battery}%</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/cattle/${cattle.id}`}
                  className="mt-3 block w-full py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-center text-sm font-semibold transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-800/50 border-b border-zinc-800">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedCattle.length === filteredData.length}
                        onChange={selectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Tag</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Breed</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Age</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Herd</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Location</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Health</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Battery</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((cattle) => (
                    <tr
                      key={cattle.id}
                      className={`border-b border-zinc-800 hover:bg-zinc-800/50 transition-all ${
                        selectedCattle.includes(cattle.id) ? 'bg-gray-500/10' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedCattle.includes(cattle.id)}
                          onChange={() => toggleSelectCattle(cattle.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🐄</span>
                          <span className="font-semibold">{cattle.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-white/60">{cattle.tag}</td>
                      <td className="px-4 py-3 text-sm">{cattle.breed}</td>
                      <td className="px-4 py-3 text-sm">{cattle.age}y</td>
                      <td className="px-4 py-3 text-sm">Herd {cattle.herd}</td>
                      <td className="px-4 py-3 text-sm text-white/60">{cattle.location}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            cattle.status === 'healthy' ? 'bg-green-400' :
                            cattle.status === 'warning' ? 'bg-yellow-400' :
                            'bg-red-400'
                          }`}></div>
                          <span className="text-sm">{cattle.health}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                cattle.battery > 60 ? 'bg-green-400' :
                                cattle.battery > 30 ? 'bg-yellow-400' :
                                'bg-red-400'
                              }`}
                              style={{ width: `${cattle.battery}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-white/60">{cattle.battery}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/cattle/${cattle.id}`}
                          className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-lg text-xs font-semibold transition-all inline-block"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredData.length === 0 && (
          <div className="bg-zinc-900 rounded-xl p-12 border border-zinc-800 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No cattle found</h3>
            <p className="text-white/40">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
