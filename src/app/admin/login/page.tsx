'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Password yang Anda masukkan salah.');
      }
    } catch (err) {
      setError('Gagal menghubungi server. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071A42] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      
      {/* 1. Ambient Brand Radial Glows */}
      <div className="absolute top-1/4 -right-28 w-[520px] h-[520px] bg-[#0066E0]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[480px] h-[480px] bg-[#E3062E]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0066E0]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 2. Subtle Kinetic Arcs Architectural Motif */}
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none select-none absolute inset-0 z-0 w-full h-full opacity-20"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 200 800 A 700 700 0 0 1 1100 100" stroke="#0066E0" strokeWidth="1.5" fill="none" />
        <path d="M 350 800 A 550 550 0 0 1 1100 250" stroke="#E6E9F2" strokeWidth="1" strokeDasharray="6 6" fill="none" />
        <path d="M 500 800 A 400 400 0 0 1 1100 400" stroke="#E3062E" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Header Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center px-4">
        <Link href="/" className="inline-block transition-transform hover:scale-105 duration-200">
          <img
            src="/images/itcg-logo.svg"
            alt="ITCG 2027"
            className="h-11 w-auto mx-auto bg-white/95 px-3 py-1.5 rounded-xl shadow-lg border border-white/20"
          />
        </Link>
        <div className="mt-4">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-[#0066E0]/20 text-[#60A5FA] border border-[#0066E0]/30 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] animate-pulse shrink-0" />
            <span>Portal Resmi Panitia ITCG 2027</span>
          </div>
        </div>
        <h1 className="mt-2.5 text-2xl font-heading font-extrabold text-white tracking-tight">
          Portal Panitia ITCG 2027
        </h1>
        <p className="mt-1 text-xs text-[#E6E9F2]/70 max-w-sm mx-auto">
          Akses terbatas khusus panitia penyelenggara.
        </p>
      </div>

      {/* Login Card Form */}
      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white rounded-2xl shadow-[0_24px_64px_-12px_rgba(7,26,66,0.6)] border border-[#E6E9F2] overflow-hidden relative">
          
          {/* Top Brand Stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#0066E0] via-[#0D2B6B] to-[#E3062E]" />

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 bg-red-50/90 border border-red-200 rounded-xl flex items-start space-x-2.5 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-heading font-bold text-[#0D2B6B] mb-1.5 uppercase tracking-wider">
                  Password Akses Admin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-[#75829C]" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Masukkan kata sandi akses..."
                    className="block w-full pl-10 pr-4 py-3 text-sm bg-[#F5F7FA] border border-[#E6E9F2] rounded-xl focus:outline-none focus:border-[#0066E0] focus:ring-2 focus:ring-[#0066E0]/20 focus:bg-white text-[#0D2B6B] transition-all"
                  />
                </div>
                <p className="mt-2 text-[11px] text-[#75829C] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0066E0] shrink-0" />
                  <span>Masukkan kata sandi akses panitia.</span>
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center px-4 py-3.5 text-sm font-heading font-bold text-white bg-[#0066E0] hover:bg-[#0052B8] active:scale-[0.99] transition-all rounded-xl shadow-[0_8px_20px_-4px_rgba(0,102,224,0.35)] disabled:opacity-50"
                >
                  <span>{loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-[#E6E9F2] flex items-center justify-between text-xs text-[#75829C]">
              <Link href="/" className="hover:text-[#0066E0] transition-colors flex items-center gap-1">
                <span>← Kembali ke Beranda</span>
              </Link>
              <span className="font-mono text-[10px] text-[#75829C]/80">ITCG 2027 Admin Auth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
