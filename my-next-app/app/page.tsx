'use client';

import LightPillar from './components/LightPillar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b0f] text-white">
      <LightPillar
        className="opacity-90"
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1}
        rotationSpeed={0.6}
        glowAmount={0.002}
        pillarWidth={3}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={25}
        interactive={false}
        mixBlendMode="screen"
        quality="high"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(140,120,255,0.2),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(255,160,220,0.22),transparent_40%)]" />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-6xl">🐮</span>
          <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            M0OO
          </h1>
        </div>
        <p className="text-xs uppercase tracking-[0.5em] text-white/60">CATTLE TRACKING SYSTEM</p>
        <h2 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          Advanced Virtual Fencing & Real-Time Herd Management
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          Monitor your entire herd with GPS tracking, intelligent geofencing, and instant alerts. 
          Keep your cattle safe and your ranch running efficiently.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            className="pointer-events-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-sm font-semibold text-white transition hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/50"
            href="/dashboard"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/map"
            className="pointer-events-auto rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
          >
            View Live Map
          </Link>
        </div>
        
        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          <div className="pointer-events-auto backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
            <p className="text-sm text-white/70">
              Monitor every animal's location with GPS precision. View movement patterns and grazing habits.
            </p>
          </div>
          
          <div className="pointer-events-auto backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-4xl mb-3">🔷</div>
            <h3 className="text-xl font-semibold mb-2">Virtual Geofencing</h3>
            <p className="text-sm text-white/70">
              Create custom boundaries with vibration alerts. No physical fences needed.
            </p>
          </div>
          
          <div className="pointer-events-auto backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-4xl mb-3">🔔</div>
            <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
            <p className="text-sm text-white/70">
              Get instant notifications for boundary breaches, health issues, and low battery warnings.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
