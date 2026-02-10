'use client';

import LightPillar from './components/LightPillar';
import Link from 'next/link';

export default function Home() {
  const trustedCompanies = [
    'AgriTech Solutions',
    'Ranch Management Pro',
    'LiveStock Systems',
    'Smart Farm Technologies',
    'Cattle Care International',
    'Precision Ranching',
    'Herd Analytics',
    'FarmTech Innovations'
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b0f] text-white">
      <LightPillar
        className="opacity-60"
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={0.8}
        rotationSpeed={0.4}
        glowAmount={0.0015}
        pillarWidth={2.5}
        pillarHeight={0.4}
        noiseIntensity={0.3}
        pillarRotation={25}
        interactive={false}
        mixBlendMode="screen"
        quality="high"
      />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            Herdle
          </h1>
        </div>
        <p className="text-sm uppercase tracking-widest text-white/50 mb-8">Cattle Tracking System</p>
        <h2 className="max-w-2xl text-2xl font-light leading-relaxed text-white/80">
          Advanced Virtual Fencing & Real-Time Herd Management
        </h2>
        <div className="mt-12 flex items-center gap-4">
          <Link
            className="pointer-events-auto rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-white transition hover:bg-white/20 border border-white/20"
            href="/pages/dashboard"
          >
            Dashboard
          </Link>
          <Link
            href="/pages/map"
            className="pointer-events-auto rounded-full px-6 py-3 text-sm font-medium text-white/60 transition hover:text-white"
          >
            Live Map
          </Link>
        </div>

        {/* Moving ticker bar */}
        <div className="mt-20 w-full max-w-4xl overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            {/* Duplicate the list for seamless loop */}
            {[...trustedCompanies, ...trustedCompanies, ...trustedCompanies].map((company, index) => (
              <span
                key={index}
                className="inline-flex items-center mx-8 text-white/30 text-sm font-medium"
              >
                {company}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/40 text-center">Trusted by fast-growing ranches worldwide</p>
        </div>
      </main>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
