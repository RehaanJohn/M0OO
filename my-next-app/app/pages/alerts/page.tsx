'use client';

import { useState } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Bessie (#247) escaped boundary',
    message: 'Crossed North Pasture fence at 2:34 PM',
    cattleId: 247,
    location: 'North Pasture - East Side',
    time: '5 min ago',
    read: false,
    actions: ['View on Map', 'Call Shepherd', 'Activate Vibration']
  },
  {
    id: 2,
    type: 'critical',
    title: 'Luna (#234) outside designated area',
    message: 'Left geofence boundary without authorization',
    cattleId: 234,
    location: 'Outside North Pasture',
    time: '12 min ago',
    read: false,
    actions: ['View on Map', 'Locate', 'Emergency Alert']
  },
  {
    id: 3,
    type: 'warning',
    title: 'Low battery alert: Collar #89',
    message: 'Battery level at 15%, requires charging soon',
    cattleId: 89,
    location: 'East Grazing',
    time: '1 hour ago',
    read: false,
    actions: ['Schedule Maintenance', 'View Details']
  },
  {
    id: 4,
    type: 'warning',
    title: 'Daisy (#156) approaching boundary',
    message: 'Currently 30m from East Grazing fence',
    cattleId: 156,
    location: 'East Grazing',
    time: '2 hours ago',
    read: true,
    actions: ['View on Map', 'Increase Vibration']
  },
  {
    id: 5,
    type: 'warning',
    title: 'Unusual behavior detected',
    message: 'Charlie (#089) showing reduced activity levels',
    cattleId: 89,
    location: 'East Grazing',
    time: '3 hours ago',
    read: true,
    actions: ['View Health Data', 'Schedule Checkup']
  },
  {
    id: 6,
    type: 'info',
    title: 'Herd A rotation complete',
    message: 'Successfully moved to North Pasture',
    cattleId: null,
    location: 'North Pasture',
    time: '4 hours ago',
    read: true,
    actions: []
  },
  {
    id: 7,
    type: 'info',
    title: 'Training milestone achieved',
    message: 'Duke (#103) successfully responded to boundary vibration 10 times',
    cattleId: 103,
    location: 'North Pasture',
    time: '5 hours ago',
    read: true,
    actions: ['View Training Progress']
  },
  {
    id: 8,
    type: 'warning',
    title: 'Collar malfunction',
    message: 'Collar #045 not responding to commands',
    cattleId: 178,
    location: 'South Field',
    time: '6 hours ago',
    read: true,
    actions: ['Run Diagnostics', 'Replace Collar']
  },
];

const alertTypes = [
  { id: 'all', label: 'All Alerts', count: alerts.length },
  { id: 'critical', label: 'Critical', count: alerts.filter(a => a.type === 'critical').length },
  { id: 'warning', label: 'Warning', count: alerts.filter(a => a.type === 'warning').length },
  { id: 'info', label: 'Info', count: alerts.filter(a => a.type === 'info').length },
  { id: 'unread', label: 'Unread', count: alerts.filter(a => !a.read).length },
];

export default function AlertsPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);

  const filteredAlerts = selectedType === 'all' 
    ? alerts 
    : selectedType === 'unread'
    ? alerts.filter(a => !a.read)
    : alerts.filter(a => a.type === selectedType);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'warning': return 'from-yellow-500 to-orange-500';
      case 'info': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Alerts & Notifications</h1>
            <p className="text-white/60">Stay informed about your herd's status</p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {alertTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`backdrop-blur-xl rounded-xl p-4 border transition-all ${
                selectedType === type.id
                  ? 'bg-purple-500/30 border-purple-400'
                  : 'bg-white/10 border-white/20 hover:bg-white/15'
              }`}
            >
              <div className="text-2xl font-bold">{type.count}</div>
              <div className="text-sm text-white/70">{type.label}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {selectedType === 'all' ? 'All Notifications' : 
                 selectedType.charAt(0).toUpperCase() + selectedType.slice(1) + ' Alerts'}
              </h2>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-all">
                Mark all as read
              </button>
            </div>

            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => setSelectedAlert(alert.id)}
                className={`backdrop-blur-xl rounded-xl p-5 border transition-all cursor-pointer ${
                  !alert.read 
                    ? 'bg-white/15 border-white/30' 
                    : 'bg-white/10 border-white/20'
                } ${
                  selectedAlert === alert.id
                    ? 'ring-2 ring-purple-400'
                    : ''
                } hover:bg-white/20`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getAlertColor(alert.type)} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {getAlertIcon(alert.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-white">{alert.title}</h3>
                      {!alert.read && (
                        <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0 ml-2 mt-1.5"></div>
                      )}
                    </div>
                    <p className="text-sm text-white/70 mb-2">{alert.message}</p>
                    <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                      <span>📍 {alert.location}</span>
                      <span>🕐 {alert.time}</span>
                    </div>

                    {/* Actions */}
                    {selectedAlert === alert.id && alert.actions.length > 0 && (
                      <div className="flex gap-2 flex-wrap pt-3 border-t border-white/10">
                        {alert.actions.map((action, idx) => (
                          <button
                            key={idx}
                            className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 rounded-lg text-xs font-semibold transition-all"
                          >
                            {action}
                          </button>
                        ))}
                        <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs border border-white/20 transition-all">
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredAlerts.length === 0 && (
              <div className="backdrop-blur-xl bg-white/10 rounded-xl p-12 border border-white/20 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-semibold mb-2">No alerts</h3>
                <p className="text-white/60">All clear! No {selectedType} alerts at the moment.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-all flex items-center gap-2">
                  <span>🚨</span> Emergency Gather
                </button>
                <button className="w-full px-4 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition-all flex items-center gap-2">
                  <span>📍</span> Locate All Cattle
                </button>
                <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all flex items-center gap-2">
                  <span>📊</span> Generate Report
                </button>
              </div>
            </div>

            {/* Alert Summary */}
            <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold mb-4">Today's Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🚨</span>
                    <span className="text-sm">Critical</span>
                  </div>
                  <span className="text-xl font-bold text-red-400">2</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚠️</span>
                    <span className="text-sm">Warnings</span>
                  </div>
                  <span className="text-xl font-bold text-yellow-400">4</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✅</span>
                    <span className="text-sm">Resolved</span>
                  </div>
                  <span className="text-xl font-bold text-green-400">12</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold mb-4">Activity Timeline</h3>
              <div className="space-y-3">
                {[
                  { time: '2:34 PM', event: 'Boundary breach', type: 'critical' },
                  { time: '1:15 PM', event: 'Herd rotated', type: 'info' },
                  { time: '11:20 AM', event: 'Low battery', type: 'warning' },
                  { time: '9:30 AM', event: 'Training complete', type: 'info' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className={`w-2 h-2 rounded-full ${
                      item.type === 'critical' ? 'bg-red-400' :
                      item.type === 'warning' ? 'bg-yellow-400' :
                      'bg-blue-400'
                    }`}></div>
                    <span className="text-white/50">{item.time}</span>
                    <span className="flex-1">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-xl bg-slate-900/95 rounded-2xl p-8 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Alert Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Notification Channels */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Notification Channels</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📱</span>
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-xs text-white/60">Instant alerts on your device</div>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">💬</span>
                      <div>
                        <div className="font-medium">SMS Alerts</div>
                        <div className="text-xs text-white/60">Text messages for critical events</div>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📧</span>
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-xs text-white/60">Daily summary reports</div>
                      </div>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </label>
                  <label className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🔔</span>
                      <div>
                        <div className="font-medium">In-App Only</div>
                        <div className="text-xs text-white/60">Show alerts only in the app</div>
                      </div>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </label>
                </div>
              </div>

              {/* Priority Levels */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Priority Levels</h3>
                <div className="space-y-2">
                  {[
                    { level: 'Critical', desc: 'Immediate SMS + Push', color: 'red' },
                    { level: 'Warning', desc: 'Push notification', color: 'yellow' },
                    { level: 'Info', desc: 'In-app only', color: 'blue' },
                  ].map((priority) => (
                    <div key={priority.level} className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${priority.color}-400`}></div>
                          <span className="font-medium">{priority.level}</span>
                        </div>
                        <span className="text-xs text-white/60">{priority.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quiet Hours */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Quiet Hours</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-2">From</label>
                    <input
                      type="time"
                      defaultValue="22:00"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">To</label>
                    <input
                      type="time"
                      defaultValue="06:00"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <p className="text-xs text-white/60 mt-2">
                  Critical alerts will still be sent during quiet hours
                </p>
              </div>

              {/* Save Button */}
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-semibold transition-all"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
