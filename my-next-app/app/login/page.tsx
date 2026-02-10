'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import LightPillar from '../components/LightPillar';

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      router.push('/pages/dashboard');
    }
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setSigningIn(true);
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message || 'Failed to sign in with Google');
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect
  }

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
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight mb-4">
              Herdle
            </h1>
            <p className="text-sm uppercase tracking-widest text-white/50 mb-2">
              Cattle Tracking System
            </p>
            <p className="text-white/70">Sign in to continue</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
            <button
              onClick={handleGoogleSignIn}
              disabled={signingIn}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 rounded-xl px-6 py-4 font-semibold hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {signingIn ? 'Signing in...' : 'Continue with Google'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="mt-6 text-center text-sm text-white/40">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-white/60 hover:text-white transition-colors text-sm"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
