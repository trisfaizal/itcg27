'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Bell,
  CheckCircle,
  Clock,
  Sparkles,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface EventUpdateData {
  id: string;
  title: string;
  description: string;
  badgeStatus: string;
  publishedAt: string | Date;
}

interface LiveUpdateBoardProps {
  updates: EventUpdateData[];
}

export default function LiveUpdateBoard({ updates = [] }: LiveUpdateBoardProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [activeModalUpdate, setActiveModalUpdate] = useState<EventUpdateData | null>(null);

  // Keyboard shortcut to close modal (ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalUpdate) {
        setActiveModalUpdate(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalUpdate]);

  // Extract unique statuses dynamically
  const statusOptions = useMemo(() => {
    const set = new Set<string>();
    updates.forEach((item) => {
      if (item.badgeStatus && item.badgeStatus.trim().length > 0) {
        set.add(item.badgeStatus.trim());
      }
    });
    return Array.from(set);
  }, [updates]);

  // Filter updates based on selected status
  const filteredUpdates = useMemo(() => {
    if (selectedStatus === 'ALL') return updates;
    return updates.filter(
      (item) => item.badgeStatus?.toLowerCase() === selectedStatus.toLowerCase()
    );
  }, [updates, selectedStatus]);

  // Sliced updates for pagination / lazy expansion
  const displayedUpdates = useMemo(() => {
    return filteredUpdates.slice(0, visibleCount);
  }, [filteredUpdates, visibleCount]);

  const handleFilterChange = (status: string) => {
    setSelectedStatus(status);
    setVisibleCount(6);
  };

  const getBadgeStyle = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('terkonfirmasi') || s.includes('confirmed')) {
      return 'bg-itcg-blue-light text-itcg-navy border-itcg-blue/30';
    }
    if (s.includes('progress') || s.includes('proses')) {
      return 'bg-blue-50 text-itcg-blue border-itcg-blue/30';
    }
    if (s.includes('open') || s.includes('buka')) {
      return 'bg-itcg-red-subtle text-itcg-red border-itcg-red/20';
    }
    return 'bg-itcg-gray-light text-itcg-navy border-itcg-gray';
  };

  const getBadgeIcon = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('terkonfirmasi') || s.includes('confirmed')) {
      return <CheckCircle className="w-3.5 h-3.5 mr-1 text-itcg-blue" />;
    }
    if (s.includes('progress') || s.includes('proses')) {
      return <Clock className="w-3.5 h-3.5 mr-1 text-itcg-blue" />;
    }
    if (s.includes('open') || s.includes('buka')) {
      return <Sparkles className="w-3.5 h-3.5 mr-1 text-itcg-red" />;
    }
    return <AlertCircle className="w-3.5 h-3.5 mr-1 text-itcg-gray-dark" />;
  };

  return (
    <section className="py-14 bg-itcg-gray-light/40 relative border-b border-itcg-gray scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-itcg-gray">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-itcg-navy text-white flex items-center justify-center shadow-xs shrink-0">
              <Bell className="w-5 h-5 text-itcg-red" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-1 bg-[#E3062E]/10 text-[#E3062E] border border-[#E3062E]/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E3062E] shrink-0" />
                <span>Official Event Bulletin</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-itcg-navy tracking-tight">
                Live Preparation Update Board
              </h2>
            </div>
          </div>

          {/* Status Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-itcg-gray-dark mr-1 font-semibold">
              <Filter className="w-3.5 h-3.5 text-itcg-blue" />
              <span>Filter:</span>
            </div>

            <button
              type="button"
              onClick={() => handleFilterChange('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all border ${
                selectedStatus === 'ALL'
                  ? 'bg-itcg-navy text-white border-itcg-navy shadow-xs'
                  : 'bg-white text-itcg-navy hover:bg-slate-50 border-itcg-gray'
              }`}
            >
              Semua ({updates.length})
            </button>

            {statusOptions.map((st) => {
              const count = updates.filter(
                (u) => u.badgeStatus.toLowerCase() === st.toLowerCase()
              ).length;
              const isSelected = selectedStatus.toLowerCase() === st.toLowerCase();
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleFilterChange(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all border ${
                    isSelected
                      ? 'bg-itcg-blue text-white border-itcg-blue shadow-xs'
                      : 'bg-white text-itcg-navy hover:bg-slate-50 border-itcg-gray'
                  }`}
                >
                  {st} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Updates Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedUpdates && displayedUpdates.length > 0 ? (
            displayedUpdates.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-itcg-gray hover:border-itcg-blue/60 p-5 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 ease-smooth flex flex-col justify-between transform hover:-translate-y-0.5 will-change-transform group"
              >
                <div>
                  {/* Card Header: Badge & Date */}
                  <div className="flex items-center justify-between pb-3 border-b border-itcg-gray/80">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-heading font-bold border ${getBadgeStyle(
                        item.badgeStatus
                      )}`}
                    >
                      {getBadgeIcon(item.badgeStatus)}
                      {item.badgeStatus}
                    </span>
                    <span className="text-[11px] font-mono text-itcg-gray-dark">
                      {formatDate(item.publishedAt)}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-base font-heading font-extrabold text-itcg-navy mt-3 leading-snug group-hover:text-itcg-blue transition-colors">
                    {item.title}
                  </h3>

                  {/* Card Description with line-clamp-4 for uniform height */}
                  <p className="line-clamp-4 overflow-hidden text-sm leading-relaxed text-itcg-navy/75 mt-2.5">
                    {item.description}
                  </p>

                  {/* Read More Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setActiveModalUpdate(item)}
                    className="mt-3 text-xs font-heading font-bold text-itcg-blue hover:text-itcg-navy inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-itcg-gray/60 flex items-center justify-between text-[10px] text-itcg-gray-dark uppercase font-heading font-semibold">
                  <span>Panitia ITCG 2027</span>
                  <span className="text-itcg-blue font-bold">Verified Announcement</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-sm text-itcg-gray-dark bg-white rounded-2xl border border-itcg-gray p-6">
              Tidak ada pengumuman dengan status &quot;{selectedStatus}&quot;.
            </div>
          )}
        </div>

        {/* Load More & Expand / Collapse Controls */}
        {filteredUpdates.length > 6 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-itcg-gray/80">
            {visibleCount < filteredUpdates.length ? (
              <>
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredUpdates.length))}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold text-white bg-itcg-navy hover:bg-[#153C8D] shadow-xs transition-all active:scale-[0.98]"
                >
                  <ChevronDown className="w-4 h-4 text-itcg-blue" />
                  <span>Muat Warta Lainnya (+{Math.min(6, filteredUpdates.length - visibleCount)})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVisibleCount(filteredUpdates.length)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold text-itcg-navy bg-white hover:bg-slate-100 border border-itcg-gray shadow-xs transition-all"
                >
                  <span>Tampilkan Semua ({filteredUpdates.length})</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setVisibleCount(6);
                  document.getElementById('updates')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold text-itcg-navy bg-white hover:bg-slate-100 border border-itcg-gray shadow-xs transition-all"
              >
                <ChevronUp className="w-4 h-4 text-itcg-blue" />
                <span>Ringkas Kembali (6 Warta Utama)</span>
              </button>
            )}
          </div>
        )}

      </div>

      {/* Clean Detail Popup Modal */}
      {activeModalUpdate && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModalUpdate(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-itcg-gray animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-itcg-gray flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-heading font-bold border ${getBadgeStyle(
                    activeModalUpdate.badgeStatus
                  )}`}
                >
                  {getBadgeIcon(activeModalUpdate.badgeStatus)}
                  {activeModalUpdate.badgeStatus}
                </span>
                <span className="text-xs font-mono text-itcg-gray-dark">
                  {formatDate(activeModalUpdate.publishedAt)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalUpdate(null)}
                className="p-1.5 text-itcg-navy/70 hover:text-itcg-navy hover:bg-slate-200/80 rounded-xl transition-colors"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-4">
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-itcg-navy leading-tight">
                {activeModalUpdate.title}
              </h3>

              {/* Multi-paragraph description formatting */}
              <div className="space-y-3.5 text-sm sm:text-base leading-relaxed text-itcg-navy/80 pt-2 border-t border-itcg-gray/80">
                {(activeModalUpdate.description || '')
                  .split(/\r?\n+/)
                  .filter((para) => para.trim().length > 0)
                  .map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph.trim()}</p>
                  ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-itcg-gray bg-slate-50 flex items-center justify-between text-xs text-itcg-gray-dark">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-itcg-navy">Panitia ITCG 2027</span>
                <span>•</span>
                <span className="text-itcg-blue font-bold">Verified Announcement</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalUpdate(null)}
                className="px-5 py-2 rounded-xl bg-itcg-navy text-white font-heading font-bold text-xs hover:bg-[#153C8D] transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
