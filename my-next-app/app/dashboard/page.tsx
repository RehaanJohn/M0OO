'use client';

import Link from 'next/link';

const statsCards = [
  { label: 'Total Cattle', value: '150', subtext: 'tracked animals', icon: '🐮', color: 'bg-zinc-800' },
  { label: 'Inside Boundaries', value: '142', subtext: 'of 150 total', icon: '✅', color: 'bg-zinc-800' },
  { label: 'Outside Boundaries', value: '8', subtext: 'need attention', icon: '⚠️', color: 'bg-zinc-800' },
  { label: 'Avg Distance', value: '2.3 km', subtext: 'today', icon: '📍', color: 'bg-zinc-800' },
  { label: 'Low Battery', value: '5', subtext: 'collars', icon: '🔋', color: 'bg-zinc-800' },
  { label: 'Active Alerts', value: '8', subtext: 'requires attention', icon: '🚨', color: 'bg-zinc-800' },
];

const systemLogs = [
  { time: '14:34:12', type: 'location', message: 'COW#1211 location update', details: 'lat: 37.7749, lng: -122.4194', level: 'info' },
  { time: '14:33:45', type: 'location', message: 'COW#0247 location update', details: 'lat: 37.7849, lng: -122.4094', level: 'info' },
  { time: '14:33:18', type: 'alert', message: 'COW#0247 boundary violation', details: 'Crossed North Pasture geofence', level: 'warning' },
  { time: '14:32:56', type: 'location', message: 'COW#0156 location update', details: 'lat: 37.7649, lng: -122.4294', level: 'info' },
  { time: '14:32:29', type: 'health', message: 'COW#0156 activity alert', details: 'Low movement detected (0.3 km/h)', level: 'warning' },
  { time: '14:31:03', type: 'system', message: 'Geofence sync completed', details: '3 geofences updated', level: 'success' },
  { time: '14:30:47', type: 'location', message: 'COW#0103 location update', details: 'lat: 37.7549, lng: -122.4394', level: 'info' },
  { time: '14:30:15', type: 'battery', message: 'COW#0089 low battery', details: 'Battery level: 12%', level: 'warning' },
  { time: '14:29:52', type: 'location', message: 'COW#0201 location update', details: 'lat: 37.7949, lng: -122.3994', level: 'info' },
  { time: '14:29:28', type: 'location', message: 'COW#0178 location update', details: 'lat: 37.7449, lng: -122.4494', level: 'info' },
  { time: '14:28:45', type: 'system', message: 'Herd A rotation scheduled', details: 'Moving to East Pasture at 15:00', level: 'info' },
  { time: '14:28:12', type: 'location', message: 'COW#0234 location update', details: 'lat: 37.7849, lng: -122.4394', level: 'info' },
  { time: '14:27:39', type: 'alert', message: 'COW#0234 boundary violation', details: 'Crossed West boundary', level: 'error' },
  { time: '14:27:05', type: 'location', message: 'COW#0145 location update', details: 'lat: 37.7749, lng: -122.3894', level: 'info' },
  { time: '14:26:33', type: 'health', message: 'COW#0103 returned to boundary', details: 'Status: Normal', level: 'success' },
];

const quickActions = [
  { label: 'Locate All Cattle', icon: '🎯', color: 'bg-purple-600 hover:bg-purple-700' },
  { label: 'View Live Map', icon: '🗺️', color: 'bg-purple-600 hover:bg-purple-700', href: '/map' },
  { label: 'Emergency Gather', icon: '🚨', color: 'bg-purple-600 hover:bg-purple-700' },
  { label: 'Generate Report', icon: '📊', color: 'bg-purple-600 hover:bg-purple-700' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pb-12">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-white/40">Ranch overview and real-time statistics</p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className={`${card.color} rounded-xl p-5 border border-zinc-700 hover:border-zinc-600 transition-all cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">
                  {card.icon}
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{card.value}</div>
              <div className="text-sm font-medium text-white/90">{card.label}</div>
              <div className="text-xs text-white/40">{card.subtext}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Logs */}
          <div className="lg:col-span-2 bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">System Logs</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-all">
                  All Logs
                </button>
                <button className="px-3 py-1 text-xs rounded-lg text-white/40 hover:bg-zinc-800 transition-all">
                  Errors Only
                </button>
                <button className="px-3 py-1 text-xs rounded-lg text-white/40 hover:bg-zinc-800 transition-all">
                  Filter
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {systemLogs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-all cursor-pointer group font-mono text-xs"
                >
                  <div className={`flex-shrink-0 w-2 h-2 mt-1.5 rounded-full ${
                    log.level === 'error' ? 'bg-red-400' :
                    log.level === 'warning' ? 'bg-yellow-400' :
                    log.level === 'success' ? 'bg-green-400' :
                    'bg-blue-400'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white/40">{log.time}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        log.type === 'alert' ? 'bg-red-500/20 text-red-400' :
                        log.type === 'health' ? 'bg-yellow-500/20 text-yellow-400' :
                        log.type === 'battery' ? 'bg-orange-500/20 text-orange-400' :
                        log.type === 'system' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {log.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-white/90 group-hover:text-white mb-1">{log.message}</p>
                    <p className="text-white/40 text-xs">{log.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 text-sm text-white/40 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
              View all logs →
            </button>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  action.href ? (
                    <Link
                      key={index}
                      href={action.href}
                      className={`w-full p-4 rounded-xl ${action.color} transition-all text-white font-semibold flex items-center gap-3 group`}
                    >
                      <span className="text-2xl">{action.icon}</span>
                      <span className="flex-1 text-left">{action.label}</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      key={index}
                      className={`w-full p-4 rounded-xl ${action.color} transition-all text-white font-semibold flex items-center gap-3 group`}
                    >
                      <span className="text-2xl">{action.icon}</span>
                      <span className="flex-1 text-left">{action.label}</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )
                ))}
              </div>
            </div>

            {/* Recent Activity Summary */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h2 className="text-xl font-bold mb-4">Activity Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-sm text-white/60">Location Updates</span>
                  <span className="text-lg font-bold text-green-400">1,247</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-sm text-white/60">Alerts Triggered</span>
                  <span className="text-lg font-bold text-yellow-400">23</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-sm text-white/60">Boundary Violations</span>
                  <span className="text-lg font-bold text-red-400">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">System Uptime</span>
                  <span className="text-lg font-bold text-blue-400">99.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}