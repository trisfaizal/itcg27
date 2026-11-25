'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
  Maximize2,
  X,
  Tv,
  Users,
  Compass,
  Eye,
  Printer,
} from 'lucide-react';
import { BoothItem, fallbackBooths } from '@/lib/data';

export default function InteractiveBoothMap() {
  const [booths, setBooths] = useState<BoothItem[]>(fallbackBooths);
  const [activeTab, setActiveTab] = useState<'2d' | '3d-main' | '3d-mezzanine'>('2d');
  const [filterTier, setFilterTier] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedBooth, setSelectedBooth] = useState<BoothItem | null>(null);

  useEffect(() => {
    async function loadBooths() {
      try {
        const res = await fetch('/api/booths');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setBooths(data);
          }
        }
      } catch (err) {
        console.warn('Using fallback booths data:', err);
      }
    }
    loadBooths();
  }, []);

  // Filtered Booths Map lookup
  const boothMap = useMemo(() => {
    const map = new Map<string, BoothItem>();
    booths.forEach((b) => map.set(b.boothNumber, b));
    return map;
  }, [booths]);

  // Statistics
  const stats = useMemo(() => {
    const total = booths.length;
    const booked = booths.filter((b) => b.status === 'BOOKED').length;
    const available = booths.filter((b) => b.status === 'AVAILABLE').length;
    const reserved = booths.filter((b) => b.status === 'RESERVED').length;
    return { total, booked, available, reserved };
  }, [booths]);

  // Render Platinum & Gold Booth Slot Button
  const renderStandardBoothSlot = (boothNumber: string, customClasses = '') => {
    const booth = boothMap.get(boothNumber);
    if (!booth) return null;

    const isMatchTier = filterTier === 'ALL' || booth.tier === filterTier;
    const isMatchStatus = filterStatus === 'ALL' || booth.status === filterStatus;
    const isDimmed = !isMatchTier || !isMatchStatus;

    const isBooked = booth.status === 'BOOKED';
    const isReserved = booth.status === 'RESERVED';
    const isAvailable = booth.status === 'AVAILABLE';

    let borderColor = 'border-itcg-gray';
    let bgColor = 'bg-white hover:bg-slate-50';

    if (booth.tier === 'PLATINUM') {
      borderColor = isBooked
        ? 'border-itcg-red'
        : 'border-itcg-red/40 hover:border-itcg-red';
      bgColor = isBooked ? 'bg-red-50/80' : 'bg-white hover:bg-red-50/40';
    } else if (booth.tier === 'GOLD') {
      borderColor = isBooked
        ? 'border-itcg-blue'
        : 'border-itcg-blue/40 hover:border-itcg-blue';
      bgColor = isBooked ? 'bg-blue-50/80' : 'bg-white hover:bg-blue-50/40';
    }

    return (
      <button
        key={booth.boothNumber}
        type="button"
        onClick={() => setSelectedBooth(booth)}
        className={`group relative rounded-xl border-2 transition-all flex flex-col items-center justify-between p-1.5 sm:p-2 select-none text-left focus:outline-none focus:ring-2 focus:ring-itcg-blue ${borderColor} ${bgColor} ${
          isDimmed ? 'opacity-25 pointer-events-none' : 'opacity-100 hover:scale-[1.02] shadow-xs hover:shadow-md'
        } ${customClasses}`}
      >
        {/* Top Badges */}
        <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-heading font-black leading-none mb-1">
          <span
            className={
              booth.tier === 'PLATINUM' ? 'text-itcg-red' : 'text-itcg-blue'
            }
          >
            {booth.boothNumber}
          </span>
          <span
            className={`text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded-full font-bold uppercase ${
              isBooked
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : isReserved
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-blue-50 text-itcg-blue border border-blue-200'
            }`}
          >
            {isBooked ? 'Terisi' : isReserved ? 'Hold' : 'Open'}
          </span>
        </div>

        {/* Center: Logo or Available Status */}
        <div className="w-full h-9 sm:h-12 flex items-center justify-center p-1 rounded-lg bg-white border border-itcg-gray/80 shadow-2xs">
          {booth.logoUrl ? (
            <img
              src={booth.logoUrl}
              alt={booth.sponsorName || booth.boothNumber}
              className="max-h-full max-w-full object-contain filter drop-shadow-2xs transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="text-center">
              <span className="text-[9px] sm:text-[10px] text-itcg-navy/70 font-semibold block leading-tight">
                {isAvailable ? 'Tersedia' : 'Reserved'}
              </span>
            </div>
          )}
        </div>

        {/* Bottom: Sponsor Name */}
        <div className="w-full mt-1">
          <p className="text-[8px] sm:text-[9px] text-itcg-navy truncate font-bold text-center">
            {booth.sponsorName || <span className="text-itcg-gray-dark font-normal">Tersedia</span>}
          </p>
        </div>
      </button>
    );
  };

  // Render Silver Booth Slot Button (Compact w-[132px], NO LOGO, PT Name Only, 1 Straight Vertical Column Layout)
  const renderSilverBoothSlot = (boothNumber: string) => {
    const booth = boothMap.get(boothNumber);
    if (!booth) return null;

    const isMatchTier = filterTier === 'ALL' || booth.tier === filterTier;
    const isMatchStatus = filterStatus === 'ALL' || booth.status === filterStatus;
    const isDimmed = !isMatchTier || !isMatchStatus;

    const isBooked = booth.status === 'BOOKED';
    const isReserved = booth.status === 'RESERVED';

    const borderColor = isBooked
      ? 'border-slate-400'
      : isReserved
      ? 'border-amber-300'
      : 'border-itcg-gray hover:border-itcg-blue/60';

    const bgColor = isBooked
      ? 'bg-slate-100 hover:bg-slate-200/70'
      : isReserved
      ? 'bg-amber-50/70 hover:bg-amber-100/60'
      : 'bg-white hover:bg-slate-50';

    return (
      <button
        key={booth.boothNumber}
        type="button"
        onClick={() => setSelectedBooth(booth)}
        className={`group relative w-full rounded-lg border transition-all p-2 select-none text-left focus:outline-none focus:ring-2 focus:ring-itcg-blue ${borderColor} ${bgColor} ${
          isDimmed ? 'opacity-25 pointer-events-none' : 'opacity-100 hover:scale-[1.02] shadow-2xs hover:shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between gap-1 leading-none">
          <span className="font-heading font-black text-[11px] text-slate-800">
            {booth.boothNumber}
          </span>
          <span
            className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0 leading-none ${
              isBooked
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : isReserved
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-blue-50 text-itcg-blue border border-blue-200'
            }`}
          >
            {isBooked ? 'Terisi' : isReserved ? 'Hold' : 'Open'}
          </span>
        </div>

        {/* PT / Company Name (Clean text only, 1 compact line truncated, no logo) */}
        <div className="mt-1">
          {isBooked ? (
            <p className="text-[10px] font-heading font-extrabold text-itcg-navy truncate" title={booth.sponsorName || ''}>
              {booth.sponsorName}
            </p>
          ) : isReserved ? (
            <p className="text-[9px] font-semibold text-amber-800 truncate" title={booth.sponsorName || 'Reserved'}>
              {booth.sponsorName || 'Reserved'}
            </p>
          ) : (
            <p className="text-[9px] font-semibold text-itcg-navy/60 truncate">
              Tersedia
            </p>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-8">
      {/* View Switcher Tabs & Quick Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-itcg-gray-light p-3 sm:p-4 rounded-2xl border border-itcg-gray shadow-xs">
        {/* Main View Mode Tabs */}
        <div className="flex items-center rounded-xl bg-white p-1 border border-itcg-gray shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('2d')}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-heading font-bold transition-all flex items-center gap-2 ${
              activeTab === '2d'
                ? 'bg-itcg-blue text-white shadow-xs'
                : 'text-itcg-gray-dark hover:text-itcg-navy'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Peta Denah Interaktif 2D</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('3d-main')}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-heading font-bold transition-all flex items-center gap-2 ${
              activeTab === '3d-main'
                ? 'bg-itcg-blue text-white shadow-xs'
                : 'text-itcg-gray-dark hover:text-itcg-navy'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Render 3D Lantai Utama</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('3d-mezzanine')}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-heading font-bold transition-all flex items-center gap-2 ${
              activeTab === '3d-mezzanine'
                ? 'bg-itcg-blue text-white shadow-xs'
                : 'text-itcg-gray-dark hover:text-itcg-navy'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Render 3D Lantai Atas</span>
          </button>
        </div>

        {/* Filter Bar (Active in 2D mode) */}
        {activeTab === '2d' && (
          <div className="flex flex-wrap items-center gap-2">
            {/* Tier Filters */}
            <div className="flex items-center rounded-xl bg-white p-1 border border-itcg-gray text-xs shadow-xs">
              {(['ALL', 'PLATINUM', 'GOLD', 'SILVER'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilterTier(t)}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                    filterTier === t
                      ? 'bg-itcg-navy text-white shadow-2xs'
                      : 'text-itcg-gray-dark hover:text-itcg-navy'
                  }`}
                >
                  {t === 'ALL' ? 'Semua' : t}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs bg-white border border-itcg-gray rounded-xl px-3 py-2 text-itcg-navy font-medium focus:outline-none focus:border-itcg-blue shadow-xs"
            >
              <option value="ALL">Semua Status</option>
              <option value="AVAILABLE">Hanya Tersedia</option>
              <option value="BOOKED">Hanya Terisi</option>
            </select>
          </div>
        )}
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-itcg-gray rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-itcg-gray-dark tracking-wider">Total Kapasitas</div>
          <div className="text-xl sm:text-2xl font-heading font-extrabold text-itcg-navy mt-0.5">24 Booth</div>
          <div className="text-[10px] text-itcg-blue mt-0.5">6 Platinum • 12 Gold • 6 Silver</div>
        </div>

        <div className="bg-white border border-itcg-gray rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Slot Terisi (Booked)</div>
          <div className="text-xl sm:text-2xl font-heading font-extrabold text-itcg-navy mt-0.5">{stats.booked} Booth</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-0.5">{Math.round((stats.booked / 24) * 100)}% Terkonfirmasi</div>
        </div>

        <div className="bg-white border border-itcg-gray rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-itcg-blue tracking-wider">Slot Tersedia</div>
          <div className="text-xl sm:text-2xl font-heading font-extrabold text-itcg-blue mt-0.5">{stats.available} Booth</div>
          <div className="text-[10px] text-itcg-gray-dark mt-0.5">Siap Dialokasikan</div>
        </div>

        <div className="bg-white border border-itcg-gray rounded-2xl p-4 shadow-xs">
          <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Akses Lantai Atas</div>
          <div className="text-xl sm:text-2xl font-heading font-extrabold text-itcg-navy mt-0.5">Theater Seats</div>
          <div className="text-[10px] text-amber-700 mt-0.5">Khusus Tim Vendor Sponsor</div>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE 2D FLOOR PLAN */}
      {activeTab === '2d' && (
        <div className="bg-itcg-gray-light/60 border border-itcg-gray rounded-3xl p-4 sm:p-7 shadow-xs relative overflow-hidden">
          
          {/* Official Update Notice Banner */}
          <div className="mb-4 flex items-center gap-2 text-xs text-itcg-navy/85 bg-[#0066E0]/8 border border-[#0066E0]/20 px-4 py-2.5 rounded-xl">
            <Info className="w-4 h-4 text-itcg-blue shrink-0" />
            <span className="font-medium">
              Status ketersediaan dan penempatan booth diperbarui langsung oleh panitia ITCG 2027.
            </span>
          </div>

          {/* Spatial Direction Labels */}
          <div className="flex items-center justify-between text-xs text-itcg-gray-dark border-b border-itcg-gray pb-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-itcg-red shrink-0" />
              <span className="font-bold text-itcg-navy uppercase tracking-wider text-[11px]">
                Main Ballroom Layout Map (Tampak Atas)
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px] font-medium text-itcg-navy">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-itcg-red/10 border border-itcg-red" />
                <span>Platinum (3x3m)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-itcg-blue/10 border border-itcg-blue" />
                <span>Gold (2x2m)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-white border border-slate-400" />
                <span>Silver (1.5x1.5m Meja Display)</span>
              </span>
            </div>
          </div>

          {/* MAIN FLOOR PLAN CONTAINER: 2 Main Left-Right Areas */}
          <div className="relative border-2 border-itcg-gray rounded-2xl bg-white p-4 overflow-x-auto select-none shadow-xs">
            
            <div className="flex items-stretch gap-4 min-w-[960px]">
              
              {/* AREA KIRI: Konten Ballroom (Sayap Atas, Area Tengah, Sayap Bawah) */}
              <div className="flex-1 flex flex-col justify-between">
                
                {/* Sayap Atas: 6 Gold (G-01..G-06) + 3 Platinum (P-01..P-03) */}
                <div className="w-full flex items-center justify-between gap-2 border-b border-itcg-gray pb-3">
                  <div className="flex-1 flex items-center gap-1.5 sm:gap-2">
                    <div className="hidden lg:block text-[10px] font-bold text-itcg-gray-dark uppercase -rotate-90 origin-center whitespace-nowrap">
                      Sayap Atas
                    </div>
                    {/* 6 Gold Booths (G-01..G-06) */}
                    <div className="grid grid-cols-6 gap-1.5 sm:gap-2 flex-1">
                      {['G-01', 'G-02', 'G-03', 'G-04', 'G-05', 'G-06'].map((num) =>
                        renderStandardBoothSlot(num, 'h-24 sm:h-28')
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-20 w-px bg-itcg-gray mx-1.5" />

                  {/* 3 Platinum Booths (P-01..P-03) Berbatasan Langsung dengan Panggung */}
                  <div className="w-64 sm:w-72 grid grid-cols-3 gap-2">
                    {['P-01', 'P-02', 'P-03'].map((num) =>
                      renderStandardBoothSlot(num, 'h-24 sm:h-28 shadow-xs ring-1 ring-itcg-red/20')
                    )}
                  </div>
                </div>

                {/* Area Tengah: Left Wall (Pintu Masuk & S-01..S-06) + Center (Round Tables & Mezzanine) */}
                <div className="flex items-stretch justify-between py-5 my-2 gap-4 flex-1 min-h-[380px]">
                  
                  {/* Left Wall: Pintu Masuk Atas, 6 Silver Booths (S-01..S-06 Compact w-[132px]), Pintu Masuk Bawah */}
                  <div className="w-[132px] max-w-[136px] shrink-0 flex flex-col justify-between items-center bg-itcg-gray-light rounded-xl border border-itcg-gray p-1.5 shadow-2xs">
                    {/* Pintu Masuk Atas */}
                    <div className="w-full py-1.5 px-1 rounded-lg bg-emerald-50 border border-emerald-300 text-center mb-1.5 shadow-2xs">
                      <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider block leading-tight">
                        Pintu Masuk
                      </span>
                      <span className="text-[8px] text-emerald-600 block leading-tight">Atas</span>
                    </div>

                    {/* 6 Silver Booths in 1 Straight Vertical Column (S-01 to S-06) */}
                    <div className="w-full flex flex-col gap-2 my-1">
                      {['S-01', 'S-02', 'S-03', 'S-04', 'S-05', 'S-06'].map((num) =>
                        renderSilverBoothSlot(num)
                      )}
                    </div>

                    {/* Pintu Masuk Bawah */}
                    <div className="w-full py-1.5 px-1 rounded-lg bg-emerald-50 border border-emerald-300 text-center mt-1.5 shadow-2xs">
                      <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider block leading-tight">
                        Pintu Masuk
                      </span>
                      <span className="text-[8px] text-emerald-600 block leading-tight">Bawah</span>
                    </div>
                  </div>

                  {/* Center: Main Audience Area with Round Tables */}
                  <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
                    {/* Mezzanine Indicator Banner */}
                    <div className="absolute top-0 inset-x-4 py-1.5 px-3 bg-indigo-50 border border-indigo-200 rounded-full flex items-center justify-between text-[10px] text-indigo-900 shadow-2xs">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Users className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Area Mezzanine (Lantai Atas)</span>
                      </span>
                      <span className="font-medium text-indigo-700">Kursi Teater Khusus Tim Sponsor &amp; FOH Production</span>
                    </div>

                    {/* Round Banquet Tables Cluster */}
                    <div className="grid grid-cols-5 sm:grid-cols-7 gap-3 sm:gap-4 mt-10 mb-2">
                      {Array.from({ length: 21 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-itcg-gray bg-itcg-gray-light flex items-center justify-center text-[9px] font-mono text-itcg-gray-dark shadow-2xs"
                          title={`Meja Peserta ${i + 1}`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="text-[10px] text-itcg-gray-dark font-bold uppercase tracking-wider mt-2">
                      Area Meja Bundar Peserta (±300 IT Leaders)
                    </div>
                  </div>

                </div>

                {/* Sayap Bawah: 6 Gold (G-07..G-12) + 3 Platinum (P-04..P-06) */}
                <div className="w-full flex items-center justify-between gap-2 border-t border-itcg-gray pt-3">
                  <div className="flex-1 flex items-center gap-1.5 sm:gap-2">
                    <div className="hidden lg:block text-[10px] font-bold text-itcg-gray-dark uppercase -rotate-90 origin-center whitespace-nowrap">
                      Sayap Bawah
                    </div>
                    {/* 6 Gold Booths (G-07..G-12) */}
                    <div className="grid grid-cols-6 gap-1.5 sm:gap-2 flex-1">
                      {['G-07', 'G-08', 'G-09', 'G-10', 'G-11', 'G-12'].map((num) =>
                        renderStandardBoothSlot(num, 'h-24 sm:h-28')
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-20 w-px bg-itcg-gray mx-1.5" />

                  {/* 3 Platinum Booths (P-04..P-06) Berbatasan Langsung dengan Panggung */}
                  <div className="w-64 sm:w-72 grid grid-cols-3 gap-2">
                    {['P-04', 'P-05', 'P-06'].map((num) =>
                      renderStandardBoothSlot(num, 'h-24 sm:h-28 shadow-xs ring-1 ring-itcg-red/20')
                    )}
                  </div>
                </div>

              </div>

              {/* AREA KANAN: PANGGUNG, VIDEOTRON & AREA TEKNIS (Full Height self-stretch, 3 Bagian Vertikal) */}
              <div className="w-36 sm:w-44 shrink-0 flex flex-col justify-between self-stretch">
                
                {/* 1. Blok Sudut Kanan Atas (Wing / Area Teknis Atas, Sejajar Sayap Atas) */}
                <div className="w-full pb-3 border-b border-itcg-gray/50">
                  <div className="w-full h-24 sm:h-28 bg-slate-200/80 border border-slate-300 rounded-xl flex flex-col items-center justify-center p-2 text-center shadow-2xs">
                    <span className="text-[10px] font-heading font-extrabold text-slate-600 uppercase tracking-wider block">
                      AREA TEKNIS
                    </span>
                    <span className="text-[8px] text-slate-500 font-medium block mt-0.5">
                      Wing Kanan Atas
                    </span>
                  </div>
                </div>

                {/* 2. Zona Tengah Panggung & Videotron (Sejajar Meja Bundar Peserta, Terbagi 2 Kolom Kiri-Kanan) */}
                <div className="w-full flex-1 py-5 my-2 flex items-stretch gap-1.5 min-h-[380px]">
                  
                  {/* Panel Kiri (~72% lebar): Area PANGGUNG Utama */}
                  <div className="flex-[0.72] rounded-xl bg-gradient-to-l from-red-50 via-red-50/50 to-white border-2 border-itcg-red/60 shadow-xs flex flex-col items-center justify-center relative overflow-hidden group">
                    {/* Aksen Lengkungan Depan Panggung menghadap meja peserta */}
                    <div className="absolute -left-2 top-1/4 bottom-1/4 w-3.5 rounded-r-full border-r-2 border-itcg-red/40 bg-itcg-red/15 pointer-events-none" />
                    
                    {/* Tulisan PANGGUNG berorientasi vertikal (dari bawah ke atas) */}
                    <div className="[writing-mode:vertical-rl] rotate-180 font-heading font-black text-xs sm:text-sm text-itcg-red tracking-[0.28em] select-none uppercase drop-shadow-2xs">
                      PANGGUNG
                    </div>

                    <span className="text-[7.5px] sm:text-[8px] text-itcg-navy/60 font-semibold mt-2 text-center px-0.5 block leading-tight">
                      Tinggi 60 cm
                    </span>
                  </div>

                  {/* Panel Kanan (~28% lebar): Area VIDEOTRON di Sisi Dinding Kanan */}
                  <div className="flex-[0.28] rounded-xl bg-itcg-navy text-white border border-itcg-navy shadow-xs flex flex-col items-center justify-center relative overflow-hidden py-3">
                    {/* Tulisan VIDEOTRON berorientasi vertikal (dari bawah ke atas) */}
                    <div className="[writing-mode:vertical-rl] rotate-180 font-heading font-bold text-[9px] sm:text-[10px] text-white tracking-[0.22em] select-none uppercase">
                      VIDEOTRON
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-itcg-red animate-pulse mt-2 shrink-0" />
                  </div>

                </div>

                {/* 3. Blok Sudut Kanan Bawah (Wing / Area Teknis Bawah, Sejajar Sayap Bawah) */}
                <div className="w-full pt-3 border-t border-itcg-gray/50">
                  <div className="w-full h-24 sm:h-28 bg-slate-200/80 border border-slate-300 rounded-xl flex flex-col items-center justify-center p-2 text-center shadow-2xs">
                    <span className="text-[10px] font-heading font-extrabold text-slate-600 uppercase tracking-wider block">
                      AREA TEKNIS
                    </span>
                    <span className="text-[8px] text-slate-500 font-medium block mt-0.5">
                      Wing Kanan Bawah
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Interactive Help Hint */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-itcg-gray-dark gap-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-itcg-blue shrink-0" />
              <span>Klik pada kotak booth untuk melihat rincian fasilitas teknis dan lokasi denah.</span>
            </div>
            <div className="text-[11px] text-itcg-gray-dark">
              *Status ketersediaan dan penempatan booth diperbarui langsung oleh panitia ITCG 2027.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RENDER 3D LANTAI UTAMA */}
      {activeTab === '3d-main' && (
        <div className="bg-white border border-itcg-gray rounded-3xl p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-itcg-gray pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-heading font-extrabold text-itcg-navy">
                Render 3D Ballroom Lantai Utama (Main Floor)
              </h3>
              <p className="text-xs text-itcg-navy/70 mt-0.5">
                Visualisasi tata letak Panggung Acara (Kanan), Booth Platinum (6 Unit), Booth Gold (12 Unit), Booth Silver (6 Unit Vertikal di Dinding Belakang), dan Meja Bundar Peserta.
              </p>
            </div>
            <a
              href="/images/venue/ballroom-floorplan-main.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-itcg-blue hover:text-itcg-navy bg-itcg-gray-light px-3 py-1.5 rounded-xl border border-itcg-gray transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Buka Resolusi Penuh</span>
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-itcg-gray shadow-xs bg-slate-50">
            <img
              src="/images/venue/ballroom-floorplan-main.png"
              alt="Render 3D Ballroom Lantai Utama ITCG 2027"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Legend Highlights from 3D View */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-itcg-gray-light border border-itcg-gray rounded-2xl p-4">
              <div className="text-xs font-bold text-itcg-red uppercase tracking-wider mb-1">
                Booth Platinum (P-01 s/d P-06)
              </div>
              <p className="text-xs text-itcg-navy/80 leading-relaxed">
                Terletak paling dekat dengan Panggung Acara (3 booth di sayap atas dan 3 booth di sayap bawah) dengan karpet merah dan partisi putih elegan.
              </p>
            </div>

            <div className="bg-itcg-gray-light border border-itcg-gray rounded-2xl p-4">
              <div className="text-xs font-bold text-itcg-blue uppercase tracking-wider mb-1">
                Booth Gold (G-01 s/d G-12)
              </div>
              <p className="text-xs text-itcg-navy/80 leading-relaxed">
                6 booth berjejer rapi di sayap atas dan 6 booth di sayap bawah menuju zona Platinum, memberikan kontak visual berkesinambungan dengan audiens.
              </p>
            </div>

            <div className="bg-itcg-gray-light border border-itcg-gray rounded-2xl p-4">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Booth Silver (S-01 s/d S-06)
              </div>
              <p className="text-xs text-itcg-navy/80 leading-relaxed">
                6 meja pameran berjejer lurus 1 kolom di dinding kiri belakang di antara dua akses Pintu Masuk, menyambut setiap delegasi yang memasuki ballroom.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RENDER 3D LANTAI ATAS & PRE-FUNCTION */}
      {activeTab === '3d-mezzanine' && (
        <div className="bg-white border border-itcg-gray rounded-3xl p-4 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 border-b border-itcg-gray pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-heading font-extrabold text-itcg-navy">
                Render 3D Lantai Atas (Mezzanine), FOH &amp; Area Pre-Function
              </h3>
              <p className="text-xs text-itcg-navy/70 mt-0.5">
                Visualisasi Gate Registrasi, Photobooth, Pintu Masuk Ganda, serta Lantai Atas dengan fasilitas Kursi Teater Khusus Tim Sponsor dan posisi FOH.
              </p>
            </div>
            <a
              href="/images/venue/ballroom-floorplan-mezzanine.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-itcg-blue hover:text-itcg-navy bg-itcg-gray-light px-3 py-1.5 rounded-xl border border-itcg-gray transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Buka Resolusi Penuh</span>
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-itcg-gray shadow-xs bg-slate-50">
            <img
              src="/images/venue/ballroom-floorplan-mezzanine.png"
              alt="Render 3D Lantai Atas Mezzanine dan Pre-Function ITCG 2027"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Highlights for Lantai Atas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-itcg-gray-light border border-itcg-gray rounded-2xl p-4">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                <span>Lantai Atas: Kursi Teater Khusus Tim Sponsor</span>
              </div>
              <p className="text-xs text-itcg-navy/80 leading-relaxed">
                Area duduk bergaya teater di lantai atas (Mezzanine) disediakan khusus bagi perwakilan dan tim vendor sponsor. Memungkinkan tim Anda untuk memantau presentasi panggung utama dengan sudut pandang elevasi yang leluasa tanpa meninggalkan area ballroom.
              </p>
            </div>

            <div className="bg-itcg-gray-light border border-itcg-gray rounded-2xl p-4">
              <div className="text-xs font-bold text-itcg-red uppercase tracking-wider mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-itcg-red" />
                <span>Pre-Function: Gate &amp; Photobooth 360</span>
              </div>
              <p className="text-xs text-itcg-navy/80 leading-relaxed">
                Area lobi luar sebelum masuk ballroom dilengkapi dengan gerbang penyambutan resmi (Gate), instalasi Photobooth 360 Spin Camera, dan meja registrasi digital QR cepat yang langsung terhubung ke kedua pintu masuk ballroom.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETAIL BOOTH (Pure Information Drawer, No Booking Actions) */}
      {selectedBooth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white border border-itcg-gray rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-itcg-navy">
            
            {/* Modal Header */}
            <div
              className={`p-6 flex items-center justify-between border-b ${
                selectedBooth.tier === 'PLATINUM'
                  ? 'bg-gradient-to-r from-red-50 to-white border-red-100'
                  : selectedBooth.tier === 'GOLD'
                  ? 'bg-gradient-to-r from-blue-50 to-white border-blue-100'
                  : 'bg-gradient-to-r from-slate-100 to-white border-slate-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-black text-xl border-2 shadow-xs ${
                    selectedBooth.tier === 'PLATINUM'
                      ? 'bg-itcg-red text-white border-white'
                      : selectedBooth.tier === 'GOLD'
                      ? 'bg-itcg-blue text-white border-white'
                      : 'bg-slate-700 text-white border-white'
                  }`}
                >
                  {selectedBooth.boothNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-itcg-gray-dark">
                      Tier {selectedBooth.tier}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        selectedBooth.status === 'BOOKED'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : selectedBooth.status === 'RESERVED'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-50 text-itcg-blue border border-blue-200'
                      }`}
                    >
                      {selectedBooth.status === 'BOOKED'
                        ? 'Terisi'
                        : selectedBooth.status === 'RESERVED'
                        ? 'Reserved'
                        : 'Tersedia'}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-extrabold text-itcg-navy mt-0.5">
                    {selectedBooth.sponsorName || `Booth ${selectedBooth.boothNumber}`}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBooth(null)}
                className="p-2 text-itcg-gray-dark hover:text-itcg-navy rounded-xl hover:bg-itcg-gray-light transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              
              {/* Sponsor Logo Preview: EXCLUSIVELY FOR PLATINUM & GOLD (Silver has NO logo) */}
              {selectedBooth.tier !== 'SILVER' && selectedBooth.status === 'BOOKED' && selectedBooth.logoUrl && (
                <div className="p-4 bg-itcg-gray-light rounded-2xl border border-itcg-gray flex items-center justify-center h-28 shadow-2xs">
                  <img
                    src={selectedBooth.logoUrl}
                    alt={selectedBooth.sponsorName || ''}
                    className="max-h-full max-w-full object-contain filter drop-shadow-2xs"
                  />
                </div>
              )}

              {/* Position and Specs */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-itcg-gray-light p-3 rounded-xl border border-itcg-gray">
                  <span className="text-itcg-gray-dark block text-[10px] uppercase font-bold">Dimensi Booth</span>
                  <span className="font-heading font-bold text-itcg-navy mt-1 block">
                    {selectedBooth.tier === 'PLATINUM'
                      ? '3.0 x 3.0 Meter'
                      : selectedBooth.tier === 'GOLD'
                      ? '2.0 x 2.0 Meter'
                      : '1.5 x 1.5 Meter (Meja Display)'}
                  </span>
                </div>

                <div className="bg-itcg-gray-light p-3 rounded-xl border border-itcg-gray">
                  <span className="text-itcg-gray-dark block text-[10px] uppercase font-bold">Daya Listrik</span>
                  <span className="font-heading font-bold text-itcg-navy mt-1 block">
                    {selectedBooth.tier === 'PLATINUM'
                      ? '2.200 Watt'
                      : selectedBooth.tier === 'GOLD'
                      ? '1.300 Watt'
                      : '450 Watt'}
                  </span>
                </div>
              </div>

              {/* Location Detail */}
              <div className="bg-itcg-gray-light p-3.5 rounded-xl border border-itcg-gray text-xs">
                <span className="text-itcg-gray-dark block text-[10px] uppercase font-bold mb-1">
                  Posisi Strategis Ballroom
                </span>
                <p className="text-itcg-navy leading-relaxed">
                  {selectedBooth.description ||
                    (selectedBooth.positionZone === 'TOP'
                      ? 'Sayap Atas (Kanan), menghadap langsung alur peserta menuju panggung utama.'
                      : selectedBooth.positionZone === 'BOTTOM'
                      ? 'Sayap Bawah (Kanan), posisi strategis dekat koridor panggung dan meja banquet.'
                      : 'Dinding Belakang (Kiri), berjejer lurus di antara dua akses Pintu Masuk ballroom.')}
                </p>
              </div>

              {/* Special Feature: Mezzanine Theater Seating Access */}
              <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>Fasilitas Kursi Teater Tim Sponsor di Lantai Atas</span>
                </div>
                <p className="text-amber-950/80 text-[11px] leading-relaxed">
                  Mitra {selectedBooth.tier} memperoleh alokasi tempat duduk gaya teater di Lantai Atas (Mezzanine) yang menghadap langsung ke Panggung Acara untuk kenyamanan pemantauan tim selama jalannya konferensi.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-5 bg-itcg-gray-light border-t border-itcg-gray flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  const targetTier = selectedBooth.tier;
                  setSelectedBooth(null);
                  setTimeout(() => {
                    window.dispatchEvent(
                      new CustomEvent('select-booth-spec', {
                        detail: { tier: targetTier },
                      })
                    );
                    const el = document.getElementById('printing-specs');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 60);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold text-itcg-blue hover:text-white bg-blue-50 hover:bg-itcg-blue border border-blue-200 hover:border-itcg-blue transition-all shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Lihat Ukuran Printing</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedBooth(null)}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold text-white bg-itcg-navy hover:bg-[#153C8D] shadow-xs transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
