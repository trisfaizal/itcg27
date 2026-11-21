'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Target, Mic, Store, ShieldCheck, Mail } from 'lucide-react';
import ModularGeometricTiles from '@/components/ModularGeometricTiles';

export default function SponsorshipCallout() {
  return (
    <section id="sponsorship-opportunity" className="relative py-20 sm:py-28 bg-[#E6E9F2] text-itcg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Architectural Card Container (Pure White Canvas) */}
        <div className="relative rounded-3xl bg-white border border-[#E6E9F2] px-6 sm:px-10 lg:px-12 py-12 lg:py-14 shadow-xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch relative z-10">

            {/* Left Column: Narrative & 4 Value Pillars on #F5F7FA Cards */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#E3062E]/10 text-[#E3062E] border border-[#E3062E]/15">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E3062E] shrink-0" />
                  <span>Strategic Partnership Opportunity</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-itcg-navy tracking-tight leading-tight">
                  Showcase Your Technology to <br className="hidden sm:inline" />
                  <span className="text-itcg-blue">
                    300+ Industrial IT Leaders
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-itcg-navy/80 leading-relaxed max-w-2xl font-normal">
                  Posisikan brand teknologi Anda di pusat transformasi kawasan industri. Berinteraksi langsung dengan 300+ pimpinan dan praktisi IT (IT Manager, IT Lead, hingga System &amp; Infrastructure Engineer) yang aktif mengevaluasi solusi enterprise di koridor industri Karawang, Bekasi, dan Purwakarta (mencakup EJIP, MM2100, Jababeka, GIIC, Suryacipta, dan kawasan industri sekitarnya).
                </p>
              </div>

              {/* 4 Architectural Strategic Pillars (#F5F7FA with Uniform #E6E9F2 Borders) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="bg-[#F5F7FA] border border-[#E6E9F2] rounded-2xl p-4 hover:border-itcg-blue/40 hover:shadow-xs transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-itcg-blue/15 text-itcg-blue flex items-center justify-center mb-3">
                    <Target className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-heading font-extrabold text-itcg-navy">
                    Direct Decision-Maker Access
                  </h4>
                  <p className="text-xs text-itcg-navy/70 mt-1 leading-relaxed">
                    Terhubung langsung dengan praktisi dan pimpinan IT lintas industri yang aktif mengevaluasi solusi teknologi untuk kebutuhan operasional mereka.
                  </p>
                </div>

                <div className="bg-[#F5F7FA] border border-[#E6E9F2] rounded-2xl p-4 hover:border-itcg-blue/40 hover:shadow-xs transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-itcg-red/15 text-itcg-red flex items-center justify-center mb-3">
                    <Mic className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-heading font-extrabold text-itcg-navy">
                    Main Stage Thought Leadership
                  </h4>
                  <p className="text-xs text-itcg-navy/70 mt-1 leading-relaxed">
                    Slot eksklusif Partner Presentation di panggung utama untuk memaparkan kapabilitas solusi, studi kasus nyata, dan wawasan strategis langsung ke seluruh audiens.
                  </p>
                </div>

                <div className="bg-[#F5F7FA] border border-[#E6E9F2] rounded-2xl p-4 hover:border-itcg-blue/40 hover:shadow-xs transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-itcg-blue/15 text-itcg-blue flex items-center justify-center mb-3">
                    <Store className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-heading font-extrabold text-itcg-navy">
                    Executive Ballroom Exhibition
                  </h4>
                  <p className="text-xs text-itcg-navy/70 mt-1 leading-relaxed">
                    Ruang booth pameran bervisibilitas prima di sayap utama ballroom dan area foyer.
                  </p>
                </div>

                <div className="bg-[#F5F7FA] border border-[#E6E9F2] rounded-2xl p-4 hover:border-itcg-blue/40 hover:shadow-xs transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-itcg-navy/15 text-itcg-navy flex items-center justify-center mb-3">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-heading font-extrabold text-itcg-navy">
                    Lasting Community Footprint
                  </h4>
                  <p className="text-xs text-itcg-navy/70 mt-1 leading-relaxed">
                    Visibilitas berkelanjutan di dalam ekosistem industri KOMITKABE selama 20+ tahun.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Key Action Box in Solid Official Navy (#0D2B6B) Aligned to Height */}
            <div className="lg:col-span-5 flex flex-col items-stretch">
              <div className="w-full h-full bg-itcg-navy text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between text-center lg:text-left border border-white/10 relative overflow-hidden">
                {/* Integrated Dark Theme Modular Geometric Tiles (z-0, bottom-right) */}
                <ModularGeometricTiles position="bottom-right" theme="dark" scale="large" className="opacity-35" />

                <div className="space-y-4 relative z-10">
                  <div>
                    <span className="inline-block px-3 py-1 text-[11px] font-heading font-extrabold uppercase tracking-wider text-white bg-itcg-blue rounded-md">
                      Partnership Tiers Open
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                      Join as an Ecosystem Partner
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E6E9F2]/80 mt-2.5 leading-relaxed font-normal">
                      Jelajahi paket kemitraan berjenjang yang dirancang bagi prinsipal teknologi, system integrator, penyedia infrastruktur cloud, serta vendor solusi industri.
                    </p>
                  </div>

                  {/* Tier Indicator Chips (Strict ITCG Palette) */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
                    <span className="text-[11px] font-heading font-extrabold text-white bg-white/15 border border-white/20 px-3 py-1 rounded-md">
                      Platinum Partner
                    </span>
                    <span className="text-[11px] font-heading font-extrabold text-white bg-itcg-blue border border-itcg-blue px-3 py-1 rounded-md">
                      Gold Exhibition
                    </span>
                    <span className="text-[11px] font-heading font-bold text-white bg-white/15 border border-white/20 px-3 py-1 rounded-md">
                      Silver Solution
                    </span>
                  </div>
                </div>

                {/* Action Buttons & Info */}
                <div className="space-y-3 pt-6 mt-6 border-t border-white/15 relative z-10 flex flex-col items-center">
                  <Link
                    href="/sponsors"
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 text-xs sm:text-sm font-heading font-extrabold text-white bg-itcg-red hover:bg-itcg-red-hover rounded-xl transition-all shadow-lg group"
                  >
                    <span>Explore Sponsorship Prospectus</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/sponsors#logo-placement"
                    className="inline-flex items-center justify-center text-xs font-heading font-bold text-itcg-blue-light hover:text-white transition-colors group py-1"
                  >
                    <span>Lihat Simulasi Penempatan Logo</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href="mailto:partnership@komitkabe.id?subject=Inquiry%20Sponsorship%20ITCG%202027"
                    className="w-full inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-heading font-bold text-white bg-transparent hover:bg-white/10 border border-white/40 hover:border-white rounded-xl transition-all"
                  >
                    <Mail className="mr-2 w-4 h-4 text-itcg-blue-light" />
                    <span>Inquire via Secretariat</span>
                  </a>

                  <p className="text-[11px] text-[#E6E9F2]/70 text-center font-heading font-medium pt-1">
                    Priority allocation based on confirmation date
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
