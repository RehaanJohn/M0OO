'use client';

import Link from 'next/link';

const statsCards = [
  { label: 'Inside Boundaries', value: '142', subtext: 'of 150 total', icon: '✅', color: 'from-green-400 to-emerald-500' },
  { label: 'Outside Boundaries', value: '8', subtext: 'need attention', icon: '⚠️', color: 'from-yellow-400 to-orange-500' },
  { label: 'Avg Distance', value: '2.3 km', subtext: 'today', icon: '📍', color: 'from-blue-400 to-cyan-500' },
  { label: 'Low Battery', value: '5', subtext: 'collars', icon: '🔋', color: 'from-red-400 to-pink-500' },
];

const activityFeed = [
  { time: '2:34 PM', text: 'Bessie (#247) crossed North Pasture boundary', type: 'alert', icon: '⚠️' },
  { time: '1:15 PM', text: 'Herd A moved to new grazing area', type: 'info', icon: '📍' },
  { time: '11:20 AM', text: 'Low battery alert: Collar #89', type: 'warning', icon: '🔋' },
  { time: '10:45 AM', text: 'Duke (#103) returned to boundary', type: 'success', icon: '✅' },
  { time: '9:30 AM', text: 'Automated rotation: Herd B to East Pasture', type: 'info', icon: '🔄' },
  { time: '8:15 AM', text: 'Health alert: Daisy (#156) low activity', type: 'alert', icon: '🏥' },
];

const quickActions = [
  { label: 'Locate All Cattle', icon: '🎯', color: 'from-purple-500 to-pink-500' },
  { label: 'Create Geofence', icon: '🔷', color: 'from-blue-500 to-cyan-500' },
  { label: 'Emergency Gather', icon: '🚨', color: 'from-red-500 to-orange-500' },
  { label: 'Generate Report', icon: '📊', color: 'from-green-500 to-emerald-500' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pb-12">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-white/60">Ranch overview and real-time status</p>
        </div>

        {/* At-a-Glance Status */}
        <div className="mb-8 backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">150 Cattle</h2>
              <p className="text-sm text-white/60">142 healthy • 8 need attention</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-lg border border-red-500/30">
              <span className="text-2xl">🚨</span>
              <div>
                <div className="font-semibold">8 Active Alerts</div>
                <div className="text-xs text-white/60">Requires attention</div>
              </div>
            </div>
          </div>

          {/* Location Overview Map Placeholder */}
          <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl overflow-hidden border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🗺️</div>
                <p className="text-white/60">Current Location Overview</p>
                <Link href="/map" className="text-sm text-purple-400 hover:text-purple-300">
                  View full map →
                </Link>
              </div>
            </div>
            {/* Simulated cattle markers */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`text-3xl p-2 rounded-lg bg-gradient-to-br ${card.color} bg-opacity-20`}>
                  {card.icon}
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{card.value}</div>
              <div className="text-sm font-medium text-white/90">{card.label}</div>
              <div className="text-xs text-white/50">{card.subtext}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Feed */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Activity Feed</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all">
                  All Events
                </button>
                <button className="px-3 py-1 text-xs rounded-lg text-white/60 hover:bg-white/10 transition-all">
                  Alerts Only
                </button>
                <button className="px-3 py-1 text-xs rounded-lg text-white/60 hover:bg-white/10 transition-all">
                  Filter
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {activityFeed.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all cursor-pointer group"
                >
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/90 group-hover:text-white">{item.text}</p>
                    <p className="text-xs text-white/50 mt-1">{item.time}</p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-white/60 hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              View all activity →
            </button>
          </div>

          {/* Quick Actions & Weather */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`w-full p-4 rounded-xl bg-gradient-to-r ${action.color} hover:shadow-lg hover:scale-105 transition-all text-white font-semibold flex items-center gap-3 group`}
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <span className="flex-1 text-left">{action.label}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Weather Widget */}
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold mb-4">Weather</h2>
              <div className="text-center">
                <div className="text-6xl mb-2">☀️</div>
                <div className="text-3xl font-bold mb-1">72°F</div>
                <p className="text-white/60 text-sm">Partly Cloudy</p>
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-white/50">Wind</div>
                    <div className="font-semibold">8 mph</div>
                  </div>
                  <div>
                    <div className="text-white/50">Humidity</div>
                    <div className="font-semibold">45%</div>
                  </div>
                  <div>
                    <div className="text-white/50">UV Index</div>
                    <div className="font-semibold">6</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
