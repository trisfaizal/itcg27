'use client';

import React, { useState } from 'react';
import {
  Tv,
  DoorOpen,
  Camera,
  CreditCard,
  CheckCircle2,
  Sparkles,
  Info,
  Maximize2,
  Layers,
  Eye,
} from 'lucide-react';

export type SponsorshipTier = 'PLATINUM' | 'GOLD' | 'SILVER';
export type MediaType = 'videotron' | 'gate' | 'backdrop' | 'idcard';

const PRESET_BRANDS = [
  'YOUR BRAND',
  'PT TEKNOLOGI NUSANTARA',
  'ENTERPRISE CLOUD ID',
];

export default function SponsorLogoSimulator() {
  const [brandName, setBrandName] = useState('YOUR BRAND');
  const [selectedTier, setSelectedTier] = useState<SponsorshipTier>('PLATINUM');
  const [activeMedia, setActiveMedia] = useState<MediaType>('videotron');
  const [idCardSide, setIdCardSide] = useState<'both' | 'back' | 'front'>('both');

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().slice(0, 24);
    setBrandName(val || 'YOUR BRAND');
  };

  // Helper to render user simulated brand box
  const renderUserBrandLogo = (tier: SponsorshipTier, sizeClass = 'text-xs') => {
    const isSelected = selectedTier === tier;
    let badgeColor = 'bg-[#0066E0] text-white border-blue-400';
    if (tier === 'PLATINUM') badgeColor = 'bg-[#E3062E] text-white border-red-300';
    if (tier === 'GOLD') badgeColor = 'bg-[#0D2B6B] text-white border-blue-300';
    if (tier === 'SILVER') badgeColor = 'bg-[#75829C] text-white border-gray-300';

    return (
      <div
        className={`relative flex items-center justify-center font-heading font-black tracking-wider transition-all duration-300 select-none ${badgeColor} ${
          isSelected
            ? 'ring-2 ring-offset-2 ring-[#0066E0] shadow-md scale-105 z-20'
            : 'opacity-70'
        } ${sizeClass}`}
      >
        <span className="truncate px-2">{brandName}</span>
        {isSelected && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066E0] opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0066E0] text-[9px] text-white items-center justify-center font-bold">
              ✓
            </span>
          </span>
        )}
      </div>
    );
  };

  // Helper for generic partner logo slots
  const renderGenericSlot = (
    label: string,
    tier: SponsorshipTier,
    sizeClass = 'text-[10px]'
  ) => {
    return (
      <div
        className={`flex items-center justify-center bg-white/90 text-itcg-navy/70 border border-[#E6E9F2] font-heading font-bold tracking-tight rounded px-2 transition-all select-none ${sizeClass}`}
      >
        <span className="truncate">{label}</span>
      </div>
    );
  };

  return (
    <section id="logo-placement" className="scroll-mt-16">
      <div className="bg-white border border-[#E6E9F2] shadow-xl rounded-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        {/* Subtle geometric corner accent node */}
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#0066E0] rounded-full blur-2xl" />
        </div>

        {/* Section Header */}
        <div className="pb-6 border-b border-[#E6E9F2]">
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0066E0]/10 text-[#0066E0] border border-[#0066E0]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
            <span>INTERACTIVE BRAND EXPOSURE PREVIEW</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-[#0D2B6B] tracking-tight leading-tight">
            Simulasi Penempatan Logo Mitra
          </h2>
          <p className="text-sm sm:text-base text-itcg-navy/75 mt-1.5 leading-relaxed max-w-3xl font-normal">
            Pratinjau ilustrasi proporsi dan posisi penempatan logo perusahaan Anda pada media utama ITCG 2027 sesuai tingkat kemitraan.
          </p>
        </div>

        {/* Control Panel: Brand Name Input & Tier Selector */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#F5F7FA] border border-[#E6E9F2] p-5 sm:p-6 rounded-2xl items-center">
          {/* Brand Name Input + Presets */}
          <div className="lg:col-span-7 space-y-2.5">
            <label
              htmlFor="sim-brand-input"
              className="block text-xs font-heading font-bold text-itcg-navy uppercase tracking-wider"
            >
              Simulasi Nama Brand Anda (Maksimal 24 Karakter)
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <input
                id="sim-brand-input"
                type="text"
                value={brandName}
                maxLength={24}
                onChange={handleBrandChange}
                placeholder="YOUR BRAND"
                className="w-full sm:w-72 h-11 px-3.5 text-sm font-heading font-black tracking-wider uppercase bg-white border border-[#E6E9F2] rounded-lg focus:outline-none focus:border-itcg-blue focus:ring-2 focus:ring-itcg-blue/20 text-itcg-navy shadow-xs"
              />
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-heading font-bold text-itcg-navy/60 mr-1 hidden sm:inline">
                  Preset Cepat:
                </span>
                {PRESET_BRANDS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBrandName(preset)}
                    className={`text-[11px] font-heading font-extrabold px-2.5 py-1.5 rounded-md border transition-all ${
                      brandName === preset
                        ? 'bg-itcg-navy text-white border-itcg-navy shadow-xs'
                        : 'bg-white text-itcg-navy/80 border-[#E6E9F2] hover:bg-white hover:text-itcg-blue'
                    }`}
                  >
                    {preset === 'YOUR BRAND' ? 'Default' : preset.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tier Selection (3 Tabs) */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="block text-xs font-heading font-bold text-itcg-navy uppercase tracking-wider">
              Tingkat Kemitraan Aktif
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedTier('PLATINUM')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border font-heading font-extrabold transition-all duration-200 ${
                  selectedTier === 'PLATINUM'
                    ? 'bg-[#E3062E] text-white border-[#E3062E] shadow-md scale-102'
                    : 'bg-white text-itcg-navy/70 border-[#E6E9F2] hover:border-itcg-red/40 hover:bg-red-50/50'
                }`}
              >
                <span className="text-xs tracking-wider">PLATINUM</span>
                <span className="text-[10px] opacity-80 font-medium">Maks. 3 Mitra</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTier('GOLD')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border font-heading font-extrabold transition-all duration-200 ${
                  selectedTier === 'GOLD'
                    ? 'bg-[#0066E0] text-white border-[#0066E0] shadow-md scale-102'
                    : 'bg-white text-itcg-navy/70 border-[#E6E9F2] hover:border-itcg-blue/40 hover:bg-blue-50/50'
                }`}
              >
                <span className="text-xs tracking-wider">GOLD</span>
                <span className="text-[10px] opacity-80 font-medium">Maks. 4 Mitra</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTier('SILVER')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border font-heading font-extrabold transition-all duration-200 ${
                  selectedTier === 'SILVER'
                    ? 'bg-[#0D2B6B] text-white border-[#0D2B6B] shadow-md scale-102'
                    : 'bg-white text-itcg-navy/70 border-[#E6E9F2] hover:border-itcg-navy/40 hover:bg-slate-50/50'
                }`}
              >
                <span className="text-xs tracking-wider">SILVER</span>
                <span className="text-[10px] opacity-80 font-medium">Maks. 6 Mitra</span>
              </button>
            </div>
          </div>
        </div>

        {/* Media Navigation Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-[#E6E9F2] pb-3">
          <button
            type="button"
            onClick={() => setActiveMedia('videotron')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-extrabold transition-all ${
              activeMedia === 'videotron'
                ? 'bg-itcg-navy text-white shadow-sm'
                : 'bg-[#F5F7FA] text-itcg-navy/70 hover:bg-itcg-gray-light hover:text-itcg-navy'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>1. Videotron Panggung Utama</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMedia('gate')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-extrabold transition-all ${
              activeMedia === 'gate'
                ? 'bg-itcg-navy text-white shadow-sm'
                : 'bg-[#F5F7FA] text-itcg-navy/70 hover:bg-itcg-gray-light hover:text-itcg-navy'
            }`}
          >
            <DoorOpen className="w-4 h-4" />
            <span>2. Welcome Gate &amp; Arch</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMedia('backdrop')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-extrabold transition-all ${
              activeMedia === 'backdrop'
                ? 'bg-itcg-navy text-white shadow-sm'
                : 'bg-[#F5F7FA] text-itcg-navy/70 hover:bg-itcg-gray-light hover:text-itcg-navy'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>3. Spanduk &amp; Photobooth</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMedia('idcard')}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-extrabold transition-all ${
              activeMedia === 'idcard'
                ? 'bg-itcg-navy text-white shadow-sm'
                : 'bg-[#F5F7FA] text-itcg-navy/70 hover:bg-itcg-gray-light hover:text-itcg-navy'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>4. ID Card Peserta</span>
          </button>
        </div>

        {/* Mockup Display + Specs Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center Stage: Interactive Visual Canvas */}
          <div className="lg:col-span-8 bg-[#071A42] rounded-2xl p-4 sm:p-6 text-white border border-white/10 shadow-inner relative overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[460px]">
            
            {/* Top Bar inside mockup viewport */}
            <div className="flex items-center justify-between pb-3 border-b border-white/15 text-xs font-mono text-itcg-blue-light/80">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase font-bold tracking-wider">
                  MOCKUP VIEW: {activeMedia.toUpperCase()}
                </span>
              </span>
              <span className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded text-[#E6E9F2]">
                Tier Sorotan: <strong>{selectedTier}</strong>
              </span>
            </div>

            {/* Visual Canvas Content */}
            <div className="my-auto py-4 w-full flex items-center justify-center">
              
              {/* TAB 1: VIDEOTRON PANGGUNG UTAMA (16m x 6m Screen) */}
              {activeMedia === 'videotron' && (
                <div className="w-full max-w-2xl bg-slate-900 border-4 border-slate-700 rounded-xl p-4 sm:p-6 shadow-2xl relative">
                  {/* Screen Content */}
                  <div className="text-center pb-4 border-b border-white/10">
                    <div className="text-[10px] sm:text-xs font-heading font-bold text-itcg-red uppercase tracking-widest">
                      6TH IT COMMUNITY GATHERING 2027
                    </div>
                    <div className="text-lg sm:text-2xl font-heading font-black tracking-tight text-white mt-0.5">
                      INTELLIGENCE IN MOTION
                    </div>
                    <div className="text-[11px] text-itcg-blue-light/70 font-medium">
                      Main Stage Keynote Session • Grand Ballroom (16m x 6m LED Screen)
                    </div>
                  </div>

                  {/* Hierarchical Logo Rows */}
                  <div className="pt-4 space-y-3.5">
                    {/* Platinum Row */}
                    <div>
                      <div className="text-[9px] font-heading font-bold text-red-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                        <span>PLATINUM PARTNERS (DOMINANT LARGE)</span>
                        {selectedTier === 'PLATINUM' && (
                          <span className="text-red-300 font-extrabold bg-red-950/60 px-1.5 py-0.5 rounded border border-red-500/40 text-[8.5px]">
                            Brand Anda Di Sini
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2.5">
                        {selectedTier === 'PLATINUM' ? (
                          renderUserBrandLogo('PLATINUM', 'h-10 sm:h-12 rounded-lg text-xs sm:text-sm')
                        ) : (
                          renderGenericSlot('PLATINUM PARTNER 01', 'PLATINUM', 'h-10 sm:h-12')
                        )}
                        {renderGenericSlot('PLATINUM PARTNER 02', 'PLATINUM', 'h-10 sm:h-12')}
                        {renderGenericSlot('PLATINUM PARTNER 03', 'PLATINUM', 'h-10 sm:h-12')}
                      </div>
                    </div>

                    {/* Gold Row */}
                    <div>
                      <div className="text-[9px] font-heading font-bold text-blue-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                        <span>GOLD PARTNERS (MEDIUM)</span>
                        {selectedTier === 'GOLD' && (
                          <span className="text-blue-300 font-extrabold bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-500/40 text-[8.5px]">
                            Brand Anda Di Sini
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {selectedTier === 'GOLD' ? (
                          renderUserBrandLogo('GOLD', 'h-7 sm:h-8 rounded text-[10px] sm:text-xs')
                        ) : (
                          renderGenericSlot('GOLD PARTNER 01', 'GOLD', 'h-7 sm:h-8')
                        )}
                        {renderGenericSlot('GOLD PARTNER 02', 'GOLD', 'h-7 sm:h-8')}
                        {renderGenericSlot('GOLD PARTNER 03', 'GOLD', 'h-7 sm:h-8')}
                        {renderGenericSlot('GOLD PARTNER 04', 'GOLD', 'h-7 sm:h-8')}
                      </div>
                    </div>

                    {/* Silver Row */}
                    <div>
                      <div className="text-[9px] font-heading font-bold text-slate-300 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                        <span>SILVER PARTNERS (COMPACT)</span>
                        {selectedTier === 'SILVER' && (
                          <span className="text-slate-200 font-extrabold bg-slate-800 px-1.5 py-0.5 rounded border border-slate-400 text-[8.5px]">
                            Brand Anda Di Sini
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-6 gap-1.5">
                        {selectedTier === 'SILVER' ? (
                          renderUserBrandLogo('SILVER', 'h-6 rounded text-[8.5px]')
                        ) : (
                          renderGenericSlot('SILVER 01', 'SILVER', 'h-6 text-[8px]')
                        )}
                        {renderGenericSlot('SILVER 02', 'SILVER', 'h-6 text-[8px]')}
                        {renderGenericSlot('SILVER 03', 'SILVER', 'h-6 text-[8px]')}
                        {renderGenericSlot('SILVER 04', 'SILVER', 'h-6 text-[8px]')}
                        {renderGenericSlot('SILVER 05', 'SILVER', 'h-6 text-[8px]')}
                        {renderGenericSlot('SILVER 06', 'SILVER', 'h-6 text-[8px]')}
                      </div>
                    </div>
                  </div>

                  {/* Stage Lighting / Podium Indicator */}
                  <div className="mt-4 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                    <span>[Stage Base / Speaker Podium Zone]</span>
                    <span>LED Display Aspect: 16:6 Wide</span>
                  </div>
                </div>
              )}

              {/* TAB 2: WELCOME GATE & ARCH */}
              {activeMedia === 'gate' && (
                <div className="w-full max-w-xl mx-auto">
                  <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl">
                    
                    {/* Gate Crown (Arch Header) */}
                    <div className="bg-gradient-to-r from-[#0D2B6B] via-[#0066E0] to-[#0D2B6B] p-3 sm:p-4 rounded-t-xl text-center border-b-2 border-itcg-red">
                      <div className="text-[10px] font-heading font-extrabold tracking-widest uppercase text-white/90">
                        WELCOME TO IT COMMUNITY GATHERING 2027
                      </div>
                      <div className="text-xs sm:text-sm font-heading font-black text-white mt-0.5">
                        GRAND BALLROOM ENTRANCE GATE
                      </div>

                      {/* Platinum Top Header Placement */}
                      <div className="mt-3 pt-2 border-t border-white/20">
                        <div className="text-[8.5px] font-mono text-red-300 font-bold uppercase tracking-wider mb-1">
                          GATE CROWN SPONSORSHIP // PLATINUM ZONE
                        </div>
                        <div className="flex justify-center gap-2">
                          {selectedTier === 'PLATINUM' ? (
                            renderUserBrandLogo('PLATINUM', 'h-8 px-4 rounded-lg text-xs')
                          ) : (
                            renderGenericSlot('PLATINUM PARTNER', 'PLATINUM', 'h-8 px-4 text-xs')
                          )}
                          {renderGenericSlot('PLATINUM PARTNER', 'PLATINUM', 'h-8 px-4 text-xs')}
                        </div>
                      </div>
                    </div>

                    {/* Gate Pillars & Walkway */}
                    <div className="grid grid-cols-12 gap-3 pt-3">
                      {/* Left Pillar */}
                      <div className="col-span-3 bg-slate-800/90 border border-slate-700 rounded-b-lg p-2 flex flex-col justify-between space-y-2 text-center min-h-[160px]">
                        <span className="text-[8px] font-mono text-slate-400">PILLAR A</span>
                        {/* Upper: Platinum / Gold */}
                        {selectedTier === 'GOLD' ? (
                          renderUserBrandLogo('GOLD', 'h-7 rounded text-[9px]')
                        ) : (
                          renderGenericSlot('GOLD PARTNER', 'GOLD', 'h-7 text-[8px]')
                        )}
                        {/* Lower: Silver */}
                        {selectedTier === 'SILVER' ? (
                          renderUserBrandLogo('SILVER', 'h-6 rounded text-[8.5px]')
                        ) : (
                          renderGenericSlot('SILVER PARTNER', 'SILVER', 'h-6 text-[8px]')
                        )}
                      </div>

                      {/* Walkway Portal (Center Opening) */}
                      <div className="col-span-6 bg-slate-950/80 border border-dashed border-slate-700/80 rounded-lg p-3 flex flex-col items-center justify-center text-center">
                        <DoorOpen className="w-8 h-8 text-itcg-blue-light/50 mb-1" />
                        <span className="text-[11px] font-heading font-extrabold text-white">
                          MAIN ACCESS PORTAL
                        </span>
                        <span className="text-[9px] text-slate-400">
                          Alur Masuk 300+ Praktisi &amp; Pimpinan IT
                        </span>
                      </div>

                      {/* Right Pillar */}
                      <div className="col-span-3 bg-slate-800/90 border border-slate-700 rounded-b-lg p-2 flex flex-col justify-between space-y-2 text-center min-h-[160px]">
                        <span className="text-[8px] font-mono text-slate-400">PILLAR B</span>
                        {renderGenericSlot('GOLD PARTNER', 'GOLD', 'h-7 text-[8px]')}
                        {renderGenericSlot('SILVER PARTNER', 'SILVER', 'h-6 text-[8px]')}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 3: SPANDUK & PHOTOBOOTH WALL */}
              {activeMedia === 'backdrop' && (
                <div className="w-full max-w-2xl bg-white text-itcg-navy p-4 sm:p-6 rounded-xl shadow-2xl border-2 border-slate-300">
                  <div className="text-center pb-3 border-b border-[#E6E9F2]">
                    <span className="text-[9px] font-heading font-extrabold text-itcg-red tracking-widest uppercase">
                      OFFICIAL PHOTO WALL BACKDROP (6M X 3M)
                    </span>
                    <h3 className="text-sm sm:text-base font-heading font-black text-itcg-navy">
                      6th IT Community Gathering 2027 • Media Coverage &amp; VIP Photo Session
                    </h3>
                  </div>

                  {/* Photo Wall Repeater Grid */}
                  <div className="pt-3 space-y-3">
                    {/* Top Tier: Platinum Partners */}
                    <div>
                      <div className="text-[8.5px] font-heading font-bold text-itcg-red uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>ZONA ATAS: PLATINUM LOGO SPOTLIGHT (DOMINAN BESAR)</span>
                        {selectedTier === 'PLATINUM' && (
                          <span className="bg-red-100 text-itcg-red font-extrabold px-1.5 py-0.5 rounded text-[8px]">
                            Brand Anda
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedTier === 'PLATINUM' ? (
                          renderUserBrandLogo('PLATINUM', 'h-9 rounded-lg text-xs')
                        ) : (
                          renderGenericSlot('PLATINUM PARTNER 01', 'PLATINUM', 'h-9')
                        )}
                        {renderGenericSlot('PLATINUM PARTNER 02', 'PLATINUM', 'h-9')}
                        {renderGenericSlot('PLATINUM PARTNER 03', 'PLATINUM', 'h-9')}
                      </div>
                    </div>

                    {/* Middle Tier: Gold Partners */}
                    <div>
                      <div className="text-[8.5px] font-heading font-bold text-itcg-blue uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>ZONA TENGAH: GOLD PARTNERS (SEDANG)</span>
                        {selectedTier === 'GOLD' && (
                          <span className="bg-blue-100 text-itcg-blue font-extrabold px-1.5 py-0.5 rounded text-[8px]">
                            Brand Anda
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {selectedTier === 'GOLD' ? (
                          renderUserBrandLogo('GOLD', 'h-7 rounded text-[10px]')
                        ) : (
                          renderGenericSlot('GOLD PARTNER 01', 'GOLD', 'h-7 text-[9px]')
                        )}
                        {renderGenericSlot('GOLD PARTNER 02', 'GOLD', 'h-7 text-[9px]')}
                        {renderGenericSlot('GOLD PARTNER 03', 'GOLD', 'h-7 text-[9px]')}
                        {renderGenericSlot('GOLD PARTNER 04', 'GOLD', 'h-7 text-[9px]')}
                      </div>
                    </div>

                    {/* Lower Tier: Silver Partners */}
                    <div>
                      <div className="text-[8.5px] font-heading font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>ZONA BAWAH: SILVER PARTNERS (RINGKAS)</span>
                        {selectedTier === 'SILVER' && (
                          <span className="bg-gray-200 text-slate-700 font-extrabold px-1.5 py-0.5 rounded text-[8px]">
                            Brand Anda
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-6 gap-1.5">
                        {selectedTier === 'SILVER' ? (
                          renderUserBrandLogo('SILVER', 'h-6 rounded text-[8px]')
                        ) : (
                          renderGenericSlot('SILVER 01', 'SILVER', 'h-6 text-[8px]')
                        )}
                        {renderGenericSlot('SILVER 02', 'SILVER', 'h-6 text-[8px]')}
                        {renderGenericSlot('SILVER 03', 'SILVER', 'h-6 text-[8px]')}
                        {renderGenericSlot('SILVER 04', 'SILVER', 'h-6 text-[8px]')}
                        {renderGenericSlot('SILVER 05', 'SILVER', 'h-6 text-[8px]')}
                        {renderGenericSlot('SILVER 06', 'SILVER', 'h-6 text-[8px]')}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#E6E9F2] text-center text-[9px] text-itcg-navy/60 font-mono">
                    Latar Belakang Foto Resmi Wawancara &amp; Dokumentasi Media Cetak/Online
                  </div>
                </div>
              )}

              {/* TAB 4: ID CARD PESERTA */}
              {activeMedia === 'idcard' && (
                <div className="w-full flex flex-col items-center">
                  {/* Top Hanging Strap */}
                  <div className="flex flex-col items-center mb-3">
                    {/* Neck Strap Loop */}
                    <div className="w-14 sm:w-16 h-8 bg-[#0D2B6B] border border-white/20 rounded-t-full flex items-center justify-center shadow-md">
                      <span className="text-[7.5px] font-mono text-white/90 font-bold uppercase tracking-widest rotate-90">
                        ITCG
                      </span>
                    </div>

                    {/* Straight Straps */}
                    <div className="w-8 sm:w-10 h-10 bg-[#0D2B6B] border-x border-white/20 flex items-center justify-center text-center">
                      <span className="text-[7px] text-white/80 font-mono tracking-tighter uppercase whitespace-nowrap -rotate-90">
                        ITCG 2027
                      </span>
                    </div>

                    {/* Clip */}
                    <div className="w-4 h-3 bg-slate-300 rounded-sm border border-slate-500 shadow-xs" />
                  </div>

                  {/* ID Card View Switcher */}
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setIdCardSide('both')}
                      className={`text-[10px] font-heading font-extrabold px-2.5 py-1 rounded transition-all ${
                        idCardSide === 'both' ? 'bg-[#0066E0] text-white' : 'bg-white/15 text-slate-300 hover:text-white'
                      }`}
                    >
                      Tampilkan Kedua Sisi
                    </button>
                    <button
                      type="button"
                      onClick={() => setIdCardSide('back')}
                      className={`text-[10px] font-heading font-extrabold px-2.5 py-1 rounded transition-all ${
                        idCardSide === 'back' ? 'bg-[#0066E0] text-white' : 'bg-white/15 text-slate-300 hover:text-white'
                      }`}
                    >
                      Hanya Sisi Belakang (Sponsor)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIdCardSide('front')}
                      className={`text-[10px] font-heading font-extrabold px-2.5 py-1 rounded transition-all ${
                        idCardSide === 'front' ? 'bg-[#0066E0] text-white' : 'bg-white/15 text-slate-300 hover:text-white'
                      }`}
                    >
                      Hanya Sisi Depan
                    </button>
                  </div>

                  {/* ID Cards Side-by-Side (PVC 90mm x 125mm) */}
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    
                    {/* FRONT CARD: OFFICIAL EVENT ONLY (NO SPONSORS) */}
                    {(idCardSide === 'both' || idCardSide === 'front') && (
                      <div className="w-52 sm:w-56 bg-white text-itcg-navy rounded-xl p-3.5 shadow-2xl border-2 border-slate-300 flex flex-col justify-between min-h-[290px]">
                        <div>
                          {/* Punch hole slot */}
                          <div className="w-8 h-1.5 bg-slate-200 rounded-full mx-auto mb-2.5" />

                          <div className="text-center border-b border-[#E6E9F2] pb-2">
                            <span className="text-[8.5px] font-heading font-black text-itcg-red tracking-widest uppercase">
                              6TH ITCG 2027
                            </span>
                            <div className="text-xs font-heading font-black text-itcg-navy">
                              CONFERENCE PASS
                            </div>
                          </div>

                          {/* Participant Profile Mockup */}
                          <div className="my-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-[#0066E0] mx-auto flex items-center justify-center text-itcg-blue font-heading font-black text-lg shadow-inner">
                              BS
                            </div>
                            <div className="text-xs font-heading font-extrabold text-itcg-navy mt-2">
                              Budi Santoso
                            </div>
                            <div className="text-[10px] text-itcg-navy/70 font-medium">
                              IT Infrastructure Lead
                            </div>
                            <div className="text-[9px] text-itcg-blue font-bold font-mono">
                              PT Industri Otomotif Karawang
                            </div>
                          </div>
                        </div>

                        {/* Front Note */}
                        <div className="pt-2 border-t border-[#E6E9F2] text-center">
                          <span className="text-[8.5px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono font-bold block">
                            SISI DEPAN: 100% BEBAS LOGO SPONSOR
                          </span>
                          <span className="text-[8px] text-gray-500 mt-0.5 block">
                            Penyelenggara Resmi: KOMITKABE
                          </span>
                        </div>
                      </div>
                    )}

                    {/* BACK CARD: ALL SPONSOR LOGOS TIERED */}
                    {(idCardSide === 'both' || idCardSide === 'back') && (
                      <div className="w-52 sm:w-56 bg-white text-itcg-navy rounded-xl p-3.5 shadow-2xl border-2 border-slate-300 flex flex-col justify-between min-h-[290px]">
                        <div>
                          {/* Punch hole slot */}
                          <div className="w-8 h-1.5 bg-slate-200 rounded-full mx-auto mb-2" />

                          <div className="text-center border-b border-[#E6E9F2] pb-1.5">
                            <span className="text-[9px] font-heading font-black text-itcg-navy uppercase tracking-wider block">
                              OFFICIAL TECHNOLOGY PARTNERS
                            </span>
                            <span className="text-[8px] text-itcg-navy/60 font-medium">
                              Sisi Belakang Kartu Peserta (PVC 90x125mm)
                            </span>
                          </div>

                          {/* Tiered Sponsor Placement */}
                          <div className="pt-2 space-y-2">
                            {/* Platinum (Top & Large) */}
                            <div>
                              <div className="text-[7.5px] font-heading font-bold text-itcg-red uppercase tracking-wider mb-0.5">
                                PLATINUM PARTNER
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                {selectedTier === 'PLATINUM' ? (
                                  renderUserBrandLogo('PLATINUM', 'h-7 rounded text-[8.5px]')
                                ) : (
                                  renderGenericSlot('PLATINUM PARTNER', 'PLATINUM', 'h-7 text-[8px]')
                                )}
                                {renderGenericSlot('PLATINUM PARTNER', 'PLATINUM', 'h-7 text-[8px]')}
                              </div>
                            </div>

                            {/* Gold (Middle & Medium) */}
                            <div>
                              <div className="text-[7.5px] font-heading font-bold text-itcg-blue uppercase tracking-wider mb-0.5">
                                GOLD PARTNERS
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                {selectedTier === 'GOLD' ? (
                                  renderUserBrandLogo('GOLD', 'h-5.5 rounded text-[8px]')
                                ) : (
                                  renderGenericSlot('GOLD PARTNER', 'GOLD', 'h-5.5 text-[7.5px]')
                                )}
                                {renderGenericSlot('GOLD PARTNER', 'GOLD', 'h-5.5 text-[7.5px]')}
                              </div>
                            </div>

                            {/* Silver (Bottom & Compact) */}
                            <div>
                              <div className="text-[7.5px] font-heading font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                                SILVER PARTNERS
                              </div>
                              <div className="grid grid-cols-3 gap-1">
                                {selectedTier === 'SILVER' ? (
                                  renderUserBrandLogo('SILVER', 'h-4.5 rounded text-[7px]')
                                ) : (
                                  renderGenericSlot('SILVER', 'SILVER', 'h-4.5 text-[7px]')
                                )}
                                {renderGenericSlot('SILVER', 'SILVER', 'h-4.5 text-[7px]')}
                                {renderGenericSlot('SILVER', 'SILVER', 'h-4.5 text-[7px]')}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Back Note */}
                        <div className="pt-2 border-t border-[#E6E9F2] text-center">
                          <span className="text-[8px] text-itcg-navy/70 font-mono block">
                            Diberikan kepada seluruh 300+ peserta &amp; pimpinan IT
                          </span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

            </div>

            {/* Bottom Indicator on Mockup */}
            <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between text-xs text-itcg-gray/80 gap-2">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simulasi interaktif waktu nyata: Nama brand &amp; tingkat kemitraan otomatis terpetakan.</span>
              </span>
              <span className="text-[11px] font-mono text-itcg-blue-light">
                ITCG 2027 Graphic System
              </span>
            </div>

          </div>

          {/* Right Stage: Detailed Technical Specifications Panel */}
          <div className="lg:col-span-4 bg-[#F5F7FA] border border-[#E6E9F2] rounded-2xl p-6 space-y-5">
            
            <div className="flex items-center space-x-2 text-xs font-heading font-bold text-itcg-navy uppercase tracking-wider">
              <Layers className="w-4 h-4 text-itcg-blue" />
              <span>Spesifikasi Eksposur Media</span>
            </div>

            {/* Current Media Specs */}
            <div className="bg-white border border-[#E6E9F2] rounded-xl p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-heading font-extrabold text-itcg-navy">
                  Media Terpilih
                </span>
                <span className="text-[11px] font-heading font-bold text-itcg-blue uppercase">
                  {activeMedia === 'videotron' && 'Videotron Panggung'}
                  {activeMedia === 'gate' && 'Welcome Gate Ballroom'}
                  {activeMedia === 'backdrop' && 'Backdrop Photobooth'}
                  {activeMedia === 'idcard' && 'ID CARD PESERTA'}
                </span>
              </div>

              <div className="text-xs space-y-2 text-itcg-navy/80">
                <div className="flex justify-between border-b border-[#E6E9F2] pb-1.5">
                  <span className="text-itcg-navy/60">Dimensi Fisik:</span>
                  <span className="font-semibold text-itcg-navy">
                    {activeMedia === 'videotron' && '16m x 6m (LED Screen)'}
                    {activeMedia === 'gate' && '4m (L) x 3.2m (T) Arch'}
                    {activeMedia === 'backdrop' && '6m x 3m (Photo Wall)'}
                    {activeMedia === 'idcard' && '90mm x 125mm (PVC Sheet)'}
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#E6E9F2] pb-1.5">
                  <span className="text-itcg-navy/60">Posisi Tier {selectedTier}:</span>
                  <span className="font-semibold text-itcg-navy">
                    {selectedTier === 'PLATINUM' && 'Baris Teratas / Dominan Besar'}
                    {selectedTier === 'GOLD' && 'Baris Menengah / Proporsional'}
                    {selectedTier === 'SILVER' && 'Baris Bawah / Ringkas'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-itcg-navy/60">Durasi Eksposur:</span>
                  <span className="font-semibold text-itcg-navy">
                    {activeMedia === 'videotron' && '2 Hari Penuh (Opening s/d Closing)'}
                    {activeMedia === 'gate' && 'Titik Masuk Utama Sepanjang Acara'}
                    {activeMedia === 'backdrop' && 'Sesi Foto VIP & Media Coverage'}
                    {activeMedia === 'idcard' && 'Dikenakan Wajib oleh Seluruh Peserta'}
                  </span>
                </div>
              </div>
            </div>

            {/* Media Exposure Detail Box */}
            <div className="bg-blue-50/60 border border-itcg-blue/30 rounded-xl p-4 text-xs space-y-2">
              <div className="font-heading font-extrabold text-itcg-navy flex items-center space-x-1.5">
                <Info className="w-4 h-4 text-itcg-blue flex-shrink-0" />
                <span>Detail Eksposur Media</span>
              </div>
              <p className="text-itcg-navy/75 leading-relaxed text-[11.5px]">
                {activeMedia === 'videotron' &&
                  'Logo mitra tampil dominan pada layar LED utama 16x6m di sepanjang sesi keynote, panel diskusi, dan seremoni pembukaan di hadapan 300+ pimpinan dan praktisi IT.'}
                {activeMedia === 'gate' &&
                  'Menjadi titik sambutan visual pertama bagi seluruh peserta, pembicara, dan tamu VIP saat memasuki area utama ballroom konferensi.'}
                {activeMedia === 'backdrop' &&
                  'Tampil pada area registrasi dan dinding foto resmi yang menjadi latar dokumentasi serta publikasi media sosial peserta selama acara berlangsung.'}
                {activeMedia === 'idcard' &&
                  'Logo mitra dicetak pada sisi belakang kartu identitas PVC (90mm x 125mm) yang dikenakan wajib oleh seluruh 300+ peserta, pembicara, dan panitia selama 2 hari penuh acara.'}
              </p>
            </div>

            {/* Direct Action Link to Inquiry Form */}
            <div className="pt-2">
              <a
                href="#partnership-inquiry"
                className="w-full inline-flex items-center justify-center px-4 py-3 text-xs sm:text-sm font-heading font-extrabold text-white bg-itcg-blue hover:bg-itcg-blue-hover rounded-xl transition-all shadow-md group"
              >
                <span>Ajukan Slot Tier {selectedTier}</span>
                <span className="ml-1.5 font-sans group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <p className="text-[10px] text-itcg-navy/60 text-center mt-1.5 font-medium">
                Pilih formulir di bawah untuk konfirmasi ketersediaan kuota
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
