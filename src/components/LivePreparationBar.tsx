'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { EventUpdateData } from './LiveUpdateBoard';

interface LivePreparationBarProps {
  updates: EventUpdateData[];
}

export default function LivePreparationBar({ updates }: LivePreparationBarProps) {
  // Ambil maksimal 5 warta terbaru untuk diputar di ticker
  const featuredUpdates = (updates || []).slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-rotating ticker every 4.5 seconds
  useEffect(() => {
    if (featuredUpdates.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredUpdates.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [featuredUpdates.length, isPaused]);

  if (!updates || updates.length === 0 || featuredUpdates.length === 0) return null;

  // Safe current index fallback
  const safeIndex = currentIndex < featuredUpdates.length ? currentIndex : 0;
  const currentUpdate = featuredUpdates[safeIndex];

  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('terkonfirmasi') || s.includes('confirmed')) {
      return 'bg-itcg-blue text-white border-itcg-blue/60 shadow-2xs';
    }
    if (s.includes('open') || s.includes('buka')) {
      return 'bg-itcg-red text-white border-itcg-red/60 shadow-2xs';
    }
    if (s.includes('progress') || s.includes('proses')) {
      return 'bg-amber-500 text-white border-amber-400/60 shadow-2xs';
    }
    return 'bg-white/15 text-white border-white/20';
  };

  const handleScrollToUpdates = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('updates');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + featuredUpdates.length) % featuredUpdates.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % featuredUpdates.length);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-itcg-navy text-white border-t border-white/15 relative z-20 select-none transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3">
          
          {/* Left: Indicator & Headline */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-itcg-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-itcg-red" />
            </span>
            <div className="text-xs font-heading font-extrabold uppercase tracking-widest text-white">
              Live Preparation Update
            </div>
            <div className="hidden sm:block h-3.5 w-px bg-white/20" />
          </div>

          {/* Center: Rotating Update Snippet with Smooth Transition */}
          <a
            href="#updates"
            onClick={handleScrollToUpdates}
            className="flex items-center space-x-3 overflow-hidden text-xs sm:text-sm group flex-1 cursor-pointer focus:outline-none focus:ring-1 focus:ring-itcg-blue rounded-lg py-0.5"
            title="Klik untuk membaca warta persiapan lengkap di bawah"
          >
            <div
              key={currentUpdate.id || safeIndex}
              className="flex items-center space-x-2.5 sm:space-x-3 overflow-hidden animate-ticker-item flex-1"
            >
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-heading font-bold border uppercase tracking-wider flex-shrink-0 transition-colors ${getStatusBadge(
                  currentUpdate.badgeStatus
                )}`}
              >
                {currentUpdate.badgeStatus}
              </span>

              <span className="font-heading font-semibold text-white group-hover:text-itcg-blue-light transition-colors truncate max-w-xl">
                {currentUpdate.title}
              </span>

              <span className="hidden md:inline text-xs text-[#E6E9F2]/80 flex-shrink-0">
                • {formatDate(currentUpdate.publishedAt)}
              </span>
            </div>
          </a>

          {/* Right: Compact Navigation Controls & View All Button */}
          <div className="flex items-center justify-between lg:justify-end gap-3 flex-shrink-0">
            {/* Navigation Arrows & Numeric Counter */}
            {featuredUpdates.length > 1 && (
              <div
                className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-heading font-bold text-white/90"
                title={isPaused ? 'Rotasi dihentikan sementara (kursor aktif)' : 'Otomatis berotasi setiap 4,5 detik'}
              >
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-0.5 rounded-full hover:bg-white/20 transition-colors text-white/75 hover:text-white"
                  aria-label="Warta sebelumnya"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <span className="font-mono text-[10px] text-white px-1">
                  {safeIndex + 1}/{featuredUpdates.length}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  className="p-0.5 rounded-full hover:bg-white/20 transition-colors text-white/75 hover:text-white"
                  aria-label="Warta berikutnya"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Quick Anchor to Updates Section */}
            <a
              href="#updates"
              onClick={handleScrollToUpdates}
              className="inline-flex items-center text-xs font-heading font-bold text-itcg-blue-light hover:text-white transition-colors group"
            >
              <span>View All Updates ({updates.length})</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
