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
    <div className="min-h-screen bg-itcg-navy flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* 30-degree subtle construction accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-itcg-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-itcg-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <Link href="/" className="inline-block">
          <img
            src="/images/itcg-logo.svg"
            alt="ITCG 2027"
            className="h-12 w-auto mx-auto bg-white/95 px-3 py-1.5 rounded"
          />
        </Link>
        <h2 className="mt-4 text-2xl font-heading font-extrabold text-white tracking-tight">
          Portal Panitia ITCG 2027
        </h2>
        <p className="mt-1 text-xs text-itcg-gray/80">
          Masuk untuk mengelola data sponsor, kuota slot, dan live update acara.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border-2 border-itcg-blue relative">

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-heading font-bold text-itcg-navy mb-1.5 uppercase tracking-wider">
                Password Akses Admin
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-itcg-gray-dark" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Masukkan password admin..."
                  className="block w-full pl-9 pr-3 py-2.5 text-sm bg-itcg-gray-light border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue focus:bg-white text-itcg-navy"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-itcg-gray-dark">
                Ditetapkan melalui variabel <code className="bg-gray-100 px-1 py-0.5 rounded text-itcg-navy">ADMIN_PASSWORD</code> di .env
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-heading font-extrabold text-white bg-itcg-blue hover:bg-itcg-blue-hover transition-all rounded-lg chamfer-badge shadow-md disabled:opacity-50"
              >
                <span>{loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-itcg-gray flex items-center justify-between text-xs text-itcg-gray-dark">
            <Link href="/" className="hover:text-itcg-blue transition-colors">
              ← Kembali ke Beranda
            </Link>
            <span className="font-mono text-[10px]">ITCG 2027 Admin Auth</span>
          </div>
        </div>
      </div>
    </div>
  );
}
