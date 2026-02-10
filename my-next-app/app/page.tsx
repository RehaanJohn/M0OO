'use client';

import LightPillar from './components/LightPillar';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b0f] text-white">
      <LightPillar
        className="opacity-90"
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1.0}
        rotationSpeed={0.3}
        glowAmount={0.006}
        pillarWidth={3.2}
        pillarHeight={0.42}
        noiseIntensity={0.5}
        pillarRotation={18}
        quality="high"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(140,120,255,0.2),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(255,160,220,0.22),transparent_40%)]" />
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.5em] text-white/60">SPECTRAL ENGINE</p>
        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          Light Pillar UI starter with a reactive, ray-marched aura.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          A minimal starting page that lets the pillar do the talking. Pair it with crisp typography and a
          focused call-to-action.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="pointer-events-auto rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noreferrer"
          >
            Explore docs
          </a>
          <button className="pointer-events-auto rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60">
            See the roadmap
          </button>
        </div>
      </main>
    </div>
  );
}
