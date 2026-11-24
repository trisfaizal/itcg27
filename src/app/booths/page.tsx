import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InteractiveBoothMap from '@/components/InteractiveBoothMap';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Denah Booth & Pemilihan Lokasi Sponsor | ITCG 2027 KOMITKABE',
  description:
    'Peta denah ballroom interaktif 2D dan render 3D pemilihan booth kemitraan Platinum, Gold, dan Silver IT Community Gathering (ITCG) 2027 di Grand Ballroom Sutan Raja Hotel & Convention Centre, Soreang, Bandung.',
};

export default function BoothsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 relative overflow-hidden select-none">
      
      {/* 1. Subtle Ambient Brand Glows */}
      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-itcg-blue/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[550px] h-[550px] bg-itcg-red/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 2. Navbar */}
      <Navbar />

      <main className="flex-grow pt-24 sm:pt-28 pb-16 sm:pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-itcg-gray">
            <div className="max-w-3xl">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0066E0]/10 text-[#0066E0] border border-[#0066E0]/20 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
                <span>SUTAN RAJA HOTEL &amp; CONVENTION CENTRE • 16-17 JANUARI 2027</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-itcg-navy tracking-tight leading-tight">
                Peta Denah &amp; Pemilihan Booth Kemitraan
              </h1>

              <p className="text-sm sm:text-base text-itcg-navy/70 mt-3 leading-relaxed">
                Jelajahi denah interaktif 2D dan visualisasi render 3D Main Ballroom ITCG 2027. Pilih titik booth strategis untuk demonstrasi teknologi perusahaan Anda di hadapan 300+ pimpinan dan praktisi IT kawasan industri.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-itcg-navy/70">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-itcg-red shrink-0" />
                  <span>Grand Ballroom Sutan Raja Hotel, Soreang - Bandung</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-itcg-blue shrink-0" />
                  <span>Termasuk Alokasi Kursi Teater Tim Sponsor di Lantai Atas</span>
                </div>
              </div>
            </div>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/sponsors"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold text-itcg-navy bg-white hover:bg-itcg-gray-light border border-itcg-gray transition-all shadow-xs"
              >
                <span>Lihat Proposal Paket</span>
                <ArrowRight className="w-4 h-4 text-itcg-blue" />
              </Link>
              <a
                href="https://wa.me/6281219884085?text=Halo%20Panitia%20ITCG%202027%2C%20mohon%20informasi%20terkait%20acara%20gathering."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold text-white bg-itcg-navy hover:bg-[#153C8D] shadow-xs transition-all"
              >
                <span>Hubungi Sekretariat Panitia</span>
              </a>
            </div>
          </div>

          {/* Interactive Map & 3D Render Gallery Component */}
          <InteractiveBoothMap />

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
