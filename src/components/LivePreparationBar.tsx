'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { EventUpdateData } from './LiveUpdateBoard';

interface LivePreparationBarProps {
  updates: EventUpdateData[];
}

export default function LivePreparationBar({ updates }: LivePreparationBarProps) {
  if (!updates || updates.length === 0) return null;

  const latestUpdate = updates[0];

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'terkonfirmasi':
        return 'bg-itcg-blue text-white border-itcg-blue/60';
      case 'open':
        return 'bg-itcg-red text-white border-itcg-red/60';
      case 'progress':
      default:
        return 'bg-white/15 text-white border-white/20';
    }
  };

  return (
    <div className="bg-itcg-navy text-white border-t border-white/15 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
          
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

          {/* Center: Latest Update Snippet */}
          <div className="flex items-center space-x-3 overflow-hidden text-xs sm:text-sm">
            <span className={`px-2 py-0.5 rounded text-[10px] font-heading font-bold border uppercase tracking-wider flex-shrink-0 ${getStatusBadge(latestUpdate.badgeStatus)}`}>
              {latestUpdate.badgeStatus}
            </span>
            <span className="font-heading font-semibold text-white truncate max-w-xl">
              {latestUpdate.title}
            </span>
            <span className="hidden md:inline text-xs text-[#E6E9F2]/90 flex-shrink-0">
              • {formatDate(latestUpdate.publishedAt)}
            </span>
          </div>

          {/* Right: Quick Anchor to Updates Section */}
          <div className="flex items-center justify-end flex-shrink-0">
            <a
              href="#updates"
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
